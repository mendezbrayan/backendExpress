'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Clientes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Clientes.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    address: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cliente',
  });
  return Clientes;
};