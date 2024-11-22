'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {

  class Notas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{
        foreignKey: 'idUser'
      })
    }
  }

  Notas.init({
    nota: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Notas',
  });
  return Notas;
};