'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      oldprice: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
    
      image: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id'
        }
      },
      buyturn:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      size:{
        type: Sequelize.STRING(100),
        allowNull: false
      },
      description: {
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
  }
  ,
  async down (queryInterface, Sequelize) {
   
      await queryInterface.dropTable('products');
    
  }
};
