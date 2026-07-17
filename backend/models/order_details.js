'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // quan he giiua bang order_details va order
      Order_details.belongsTo(models.Order, {
        foreignKey: 'order_id',
        as: 'order'
      });
      // quan he giiua bang order_details va product
      Order_details.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product'
      });
    }
  }
  Order_details.init({
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order_details',
    tableName: 'order_details',
     createdAt :'created_at',
    updatedAt :'updated_at',
    underscored: true
  });
  return Order_details;
};