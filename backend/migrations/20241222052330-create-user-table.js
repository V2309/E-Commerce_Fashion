'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      email: {
    //    allowNull: false,
        type: Sequelize.STRING,
        unique: true
      
      },
      password: {
       
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.INTEGER
      },
      phone: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
    });
  },

  async down (queryInterface, Sequelize) {
    
   
      await queryInterface.dropTable('users');
     
  }
};
