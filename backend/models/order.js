'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // quan he giua bang order va user
      Order.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      // quan he giua bang order va orderdetail
      Order.hasMany(models.Order_details, {
        foreignKey: 'order_id'
      });
    }
  }
  Order.init({
    user_id: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'
    },
    session_id: DataTypes.TEXT,
    notes: DataTypes.TEXT,
    total: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    address: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    createdAt :'created_at',
    updatedAt :'updated_at',
    underscored: true,
  });
  return Order;
};