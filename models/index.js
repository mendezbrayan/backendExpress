import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import { fileURLToPath } from 'url';
import process from 'process';
import configFile from '../config/config.js';

// Configuración para ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configFile[env];
const db = {};

// Configurar conexión Sequelize
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Cargar modelos de forma dinámica usando `import`
const initModels = async () => {
  const files = fs.readdirSync(__dirname).filter((file) => {
    return (
      file.indexOf('.') !== 0 && // Excluir archivos ocultos
      file !== basename && // Excluir este archivo (index.js)
      file.slice(-3) === '.js' // Solo incluir archivos .js
    );
  });

  // Cargar todos los modelos
  for (const file of files) {
    const { default: defineModel } = await import(path.join(__dirname, file));
    const model = defineModel(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  }

  // Configurar asociaciones (si existen)
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
};

// Llama a la inicialización antes de exportar
await initModels();

export default db;