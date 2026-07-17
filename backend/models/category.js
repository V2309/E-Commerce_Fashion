'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
  
    static associate(models) {
      // define association here
      
      // quan he giua bang category va product
      Category.hasMany(models.Product, {
        foreignKey: 'category_id'
      });

    }
  }
  Category.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    
   // created_at: DataTypes.DATE,
  //  updated_at: DataTypes.DATE
    


   
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    createdAt :'created_at',
    updatedAt :'updated_at',
    underscored: true
  });
  return Category;
};