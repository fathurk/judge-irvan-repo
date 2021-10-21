const { Account, Item, Seller, Cart, Buyer } = require('../models/index')
const upload = require('../app')
const cloudinary = require('cloudinary').v2
const changeFormatCurrency = require('../helpers/changeFormatCurrency')

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
        return Cart.increment('quantity', {where : {BuyerId: buyerId, ItemId: itemId}})
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
    Cart.findAll()
    .then( data => {
      console.log('masuk');
      console.log(data);
      res.send(data)
    }) 
    .catch( err => {
      console.log('errorr');
      console.log(err);
      res.send(err)
    })
  }

  static deleteFromCart (req, res) {
    Cart.destroy({where: {id: req.query.id}})
    .then( data => {
      res.redirect('/buyer')
    })
    .catch( err => {
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
    let quantityValue = []
    Cart.findAll({where: {BuyerId: req.session.roleId}})
    .then( data => {
      data.forEach( el => {
        itemKey.push(el.ItemId)
        quantityValue.push(el.quantity)
      })

      return Item.decrement('quantity', {by: quantityValue ,where: {id: itemKey}})
    })
    .then( data => { 
      return Cart.destroy({where: {BuyerId: req.session.roleId}})
    })
    .then( data => {
      res.redirect('/')
    })
    .catch( err => {
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
      res.redirect('/buyer')
    })
    .catch(err => {
      res.send(err)
    })
  }
}

module.exports = BuyerController;