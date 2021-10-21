const { Account, Buyer, Seller } = require('../models/index')

class AccountController {
  static login (req, res) {
    
  }

  static postLogin (req, res) {

  }

  static register (req, res) {
    
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