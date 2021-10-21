'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item.belongsTo(models.Seller)
      Item.belongsToMany(models.Buyer, { through: 'Carts'})
    }

    info(seller) {
      return `Dikirim dari ${seller.cityRegion}`
    }
  };
  Item.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Please input name!'}
      }},
      description: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {msg: 'Please input description!'}
      }},
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {msg: 'Please input price!'}
      }},
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {msg: 'Please input stock!'}
      }},
    isActive: {
      type: DataTypes.BOOLEAN,
      },
    imageUrl: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Please add image file!'}
      }},
    SellerId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: instance => {
        instance.isActive = true
      }
    },
    sequelize,
    modelName: 'Item',
  });
  return Item;
};