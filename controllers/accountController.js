const { Account, Buyer, Seller } = require('../models/index')

class AccountController {
  static login (req, res) {
    res.render('login')
  }

  static postLogin (req, res) {
    Account.findOne({where: {username: req.body.username}})
    .then( data => {
      // console.log(data, 'ini data');
      // console.log(req.body, 'ini req body');
      if(data.dataValues.password == req.body.password) {
        // console.log('masuk if');
        req.session.accountid = data.id
        req.session.role = data.role

        if(data.role == 'seller') {
          return Seller.findOne({where: {AccountId: data.id}})
        } else { 
          return Buyer.findOne({where: {AccountId: data.id}})
        }
      } else {
        throw new Error('Passwords do not match')
      }
    })
    .then( data => {
      req.session.roleId = data.id
      // console.log('ini session 2');
      if(req.session.role == 'seller') {
        // console.log('masuk lagi lagi');
        res.redirect('/sellers/items')
      } else {
        res.redirect('/buyers')
      }
    })
    .catch( err => {
      console.log(err, 'login err');
      res.send(err)
    })
  }

  static register (req, res) {
   res.render('addAccountForm')
  }

  static postRegister (req, res) {
    let { username, email, phoneNumber, password, role } = req.body
    Account.findOne({where: {email}})
    .then( data => {
      if(data) {
        throw new Error('Email sudah digunakan!')
      } else {
        return Account.create({ username, email, phoneNumber, password, role })
      }
    })
    .then( data => {

      req.session.accountid = data.id
      req.session.role = role

      if(role == 'seller') {
        return Seller.create({cityRegion: 'temp',AccountId: data.id})
      } else {
        return Buyer.create({address: 'temp',AccountId: data.id})
      }
    })
    .then( data => {
      req.session.roleId = data.id
      if(role == 'seller') {
        res.redirect('/sellers/items')
      } else {
        res.redirect('/buyers')
      }
    })
    .catch( err => {
      console.log(err);
      res.send(err)
    })
  }
}

module.exports = AccountController;