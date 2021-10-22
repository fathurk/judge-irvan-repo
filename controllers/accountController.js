const { Account, Buyer, Seller } = require('../models/index')
const bcrypt = require('bcryptjs')

class AccountController {
  static login (req, res) {
    let opt = {error: null}
    if(req.query.error) {
      opt.error = req.query.error
    }
    res.render('login', opt)
  }

  static postLogin (req, res) {
    Account.findOne({where: {username: req.body.username}})
    .then( data => {
      let check = bcrypt.compareSync(req.body.password, data.password)
      if(check) {
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
      if(req.session.role == 'seller') {
        res.redirect('/sellers/items')
      } else {
        res.redirect('/buyers')
      }
    })
    .catch( err => {
      res.redirect(`/login?error=${err}`)
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
        console.log(req.body, 'tangkap body');
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

  static logout(req, res) {
    req.session = {}
    res.redirect('/')
  }
}

module.exports = AccountController;