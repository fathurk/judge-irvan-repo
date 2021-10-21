const { Account, Buyer, Seller } = require('../models/index')

class AccountController {
  static login (req, res) {
    res.render('login')
  }

  static postLogin (req, res) {
    Account.findOne({where: {username: req.body.username}})
    .then( data => {
      if(data.password == req.body.password) {
        req.session.accountid = data.id
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
        res.redirect('/sellers')
      } else {
        res.redirect('/buyers')
      }
    })
    .catch( err => {
      res.send(err)
    })
  }
}

module.exports = AccountController;