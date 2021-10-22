const { Account, Item, Seller, Cart, Buyer } = require('../models/index')
const upload = require('../app')
const cloudinary = require('cloudinary').v2
const changeFormatCurrency = require('../helpers/changeFormatCurrency')
const Op = require('sequelize').Op

class BuyerController {
  static showAllItems (req, res) {
    let search = req.query.search
    let option = { where: {}, include: Seller }

    if(search) option.where.name = search

    Item.findAll(option)
    .then( data => {
      let image = data.map( el => {
        cloudinary.url(el.imageUrl)
      })

      let newPrice = data.map(el => {
        return changeFormatCurrency(el.price)
      })
      res.render('home', {data, image, newPrice})
    })
  }
  
  static addToCart (req, res) {
    let buyerId = req.session.roleId
    let itemId = req.params.itemid
    // console.log(req.session);  
    Cart.findOne({where: { ItemId: itemId, BuyerId: buyerId }})
    .then( data => {
      console.log(data);
      if (data == null) {
        return Cart.create({BuyerId: buyerId, ItemId: itemId})
      } else {
        res.redirect('/buyers')
      }
    })
    .then( data => {
      // console.log('masuk');
      res.redirect('/buyers')
    })
    .catch( err => {
      console.log(err);
      res.send(err)
    })
  }

  static showCart (req, res) {
    Cart.findAll({where: {BuyerId: req.session.roleId}, include: Item})
    .then( data => {
      console.log('masuk');
      console.log(data);
      res.render('showCart', {data})
    }) 
    .catch( err => {
      console.log('errorr');
      console.log(err);
      res.send(err)
    })
  }

  static deleteFromCart (req, res) {
    Cart.destroy({where: {id: req.params.cartid}})
    .then( data => {
      res.redirect('/buyers')
    })
    .catch( err => {
      console.log(err);
      res.send(err)
    })
  }

  static showDetailItems (req, res) {
    Item.findByPk(req.params.itemid, {include: Seller})
    .then( data => {
      let image = cloudinary.url(data.imageUrl)
      // console.log(data);
      let info = data.info(data.Seller)
      // console.log(info);
      res.render('detailItem', {data, info})
    })
    .catch( err => {
      res.send(err)
    })
  }

  static checkout (req, res) {
    let itemKey = []
    Cart.findAll({where: {BuyerId: req.session.roleId}})
    .then( data => {
      data.forEach( el => {
        itemKey.push(el.ItemId)
      })
      console.log('masuk then pertama');
      return Item.decrement('stock', {where: {id: itemKey}})
    })
    .then( data => { 
      console.log('masuk then kedua');
      return Cart.destroy({where: {BuyerId: req.session.roleId}})
    })
    .then( data => {
      res.redirect('/buyers')
    })
    .catch( err => {
      console.log(err);
      res.send(err)
    })

  }

  static changeProfile (req, res) {
    Buyer.findByPk(req.session.roleId, {include: Account})
    .then( data => {
      res.send(data)
    })
  }

  static postChangeProfile (req, res) {
    let { username, email, phonenumber, password } = req.body
    Account.update({ username, email, phonenumber, password }, {where: { id: req.session.roleId}})
    .then( data => {
      res.redirect('/buyers')
    })
    .catch(err => {
      res.send(err)
    })
  }
}

module.exports = BuyerController;