'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
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
    hooks: {
      beforeCreate: instance => {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(instance.password, salt);
        instance.password = hashedPassword;
      }
    },
    sequelize,
    modelName: 'Account',
  });
  return Account;
};