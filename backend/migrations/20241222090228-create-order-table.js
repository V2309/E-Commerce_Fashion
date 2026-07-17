'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending'
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      total: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true
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
   
      await queryInterface.dropTable('orders');
    
  }
};
