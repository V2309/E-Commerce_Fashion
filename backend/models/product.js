'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
   
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: 'category_id'
      });
    // quan he giua bang product va bang orderdetail
    Product.hasMany(models.Order_details, {
      foreignKey: 'product_id'
    });

    Product.hasMany(models.CartItem, {
      foreignKey: 'product_id'
    });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    oldprice: DataTypes.INTEGER,
    image: DataTypes.TEXT,
    quantity: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    buyturn: DataTypes.INTEGER,
    size: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    underscored: true,
    createdAt :'created_at',
    updatedAt :'updated_at'
  });
  return Product;
};