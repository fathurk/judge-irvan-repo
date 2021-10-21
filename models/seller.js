'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seller extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Seller.belongsTo(models.Account)
      Seller.hasMany(models.Item)
    }
  };
  Seller.init({
    cityRegion: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Please input region!'}
      }},
    AccountId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Seller',
  });
  return Seller;
};