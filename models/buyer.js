'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Buyer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Buyer.belongsTo(models.Account)
      Buyer.belongsToMany(models.Item, { through: 'Carts'})
    }
  };
  Buyer.init({
    address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Please Enter address!'}}},
    AccountId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Buyer',
  });
  return Buyer;
};