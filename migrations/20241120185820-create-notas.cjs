'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nota: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2),
      },
      idUser:{ //Lave forania
      type: Sequelize.INTEGER,
      allowNull: false,
      references:{
        model:'Users', //Nombre de la Tabla referenciada
        key:'id' // Columna refenciada
      },
      onUpdate:'CASCADE', //Acciones al actualizar
      onDelete: 'CASCADE' // Acciones al Eliminar
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Notas');
  }
};