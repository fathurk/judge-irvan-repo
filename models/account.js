'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Account.hasOne(models.Buyer)
      Account.hasOne(models.Seller);
    }
  };
  Account.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Please input username!'}
      }},
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Please input email!'}
      }},
    phoneNumber: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Please input Phone Nummber'}
      }},
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Please choose role!'}
      }},
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Please input password!'}
      }}
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};