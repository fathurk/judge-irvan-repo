const { Account, Buyer, Seller } = require('../models/index')

class AccountController {
  static login (req, res) {
    res.render('login')
  }

  static postLogin (req, res) {
    Account.findOne({where: {email: req.body.email}})
    .then( data => {
      if(data.password == req.body.password) {
        req.session.email = data.email
        req.session.role = data.role

        if(data.role == 'seller') {
          res.redirect('/sellers')
        } else {
          res.redirect('/buyers')
        }
      } else {
        throw new Error('Passwords do not match')
      }
    })
    .catch( err => {
      res.send(err)
    })
  }

  static register (req, res) {
    let { username, email, password, phonenumber, role } = req.body
    Account.findOne({where: {email}})
    .then( data => {
      if(data) {
        throw new Error('Email has been registered')
      } else {
        return Account.create({ username, email, password, phonenumber, role })
      }
    })
    .then( data => {
      req.session.email = email
      req.session.role = role

      if(role == 'seller') {
        res.redirect('/sellers')
      } else {
        res.redirect('/buyers')
      }
    })
    .catch( err => {
      res.send(err)
    })
  }

  static postRegister (req, res) {
    let { username, email, phonenumber, password, role } = req.body
    Account.findOne({where: {email}})
    .then( data => {
      if(data) {
        throw new Error('Email sudah digunakan!')
      } else {
        return Account.create({ username, email, phonenumber, password, role })
      }
    })
    .then( data => {
      res.redirect('/login')
    })
    .catch( err => {
      res.send(err)
    })
  }
}

module.exports = AccountController;