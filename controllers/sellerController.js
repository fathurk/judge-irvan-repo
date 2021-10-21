const { Account, Item, Seller, Cart, Buyer } = require('../models/index')
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Op = require('sequelize').Op

cloudinary.config({ 
  cloud_name: 'hacktiv8', 
  api_key: '562616762217145', 
  api_secret: '3s3ScX1g1NtJhdZnzSjDtwm107A' 
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'judge_irvan',
    allowedFormats: ["jpeg", "jpg", "png"]
  }
})

const upload = multer({ storage });

class SellerController {
  static addItems (req, res) {
    let opt = {id: req.session.roleId}
    if(req.query.errors) {
      opt.errors = req.query.errors
    }
    res.render('addItemForm', opt)
  }

  static postAdditems (req, res) {
    let sellerid = req.session.roleId
    let { name, desciption, price, stock } = req.body

    Item.create({ name, desciption, price, stock, imageUrl: req.file.filename, SellerId: sellerid })
    .then( data => {
      res.redirect(`/sellers/items`)
    })
    .catch(err => {
      res.redirect(`/${sellerid}/items/add?errors=${err}`)
    })
  }

  static showAllItems (req, res) {
    console.log(req.session);
    let opt = {where: {SellerId: req.session.roleId}}
    if(req.query.search) {
      opt.name = {[Op.iLike]: `%${req.query.search}%`}
    }
    Item.findAll(opt)
    .then( data => {
      let image = data.map(item => {
        return cloudinary.url(item.imageUrl)
      })
      res.render('itemsBySeller', {data, image})
    })
    .catch(err => {
      console.log(err);
      res.send(err)
    })
  }

  static changeProfile (req, res) {
    
    Seller.findByPk(req.session.roleId, {include: Account})
    .then( data => {
      let passObj = {data}
      if(req.query.errors) {
        passObj.errors = req.query.errors
      }
      res.render('changeProfileSeller', passObj)
    })
  }

  static postChangeProfile (req, res) {
    let { username, email, phonenumber, password } = req.body
    Account.update({ username, email, phonenumber, password }, {where: { id: req.session.roleId}})
    .then( data => {
      res.redirect('/buyer')
    })
    .catch(err => {
      let errList = err.Errors.map( el => {
        return el
      })
      res.redirect(`/${sellerid}/changeprofile?errors=${errList}`)
    })
  }

  static deleteItems (req, res) {
    Item.findOne({where: {id: req.params.itemid}})
    .then ( data => {
      cloudinary.uploader.destroy(data.imageUrl)
      return Item.destroy({where: {id: req.params.itemid}})
    })
    .then( data => {
      res.redirect(`/sellers/items`)
    })
    .catch( err => {
      res.send(err)
    })
  }

  static editItems (req, res) {
    Item.findByPk(req.params.itemid)
    .then( data => {
      cloudinary.uploader.destroy(data.imageUrl)

      res.render('editItemForm', {data, id: req.params.itemid})
    })
    .catch( err => {
      res.send(err)
    })
  }

  static postEditItems (req, res) {
    let { name, description, price, stock } = req.body
    let sellerid = req.session.roleId
    let itemid = req.params.itemid
    Item.update({ name, description, price, stock, imageUrl: req.file.filename },{where: {id: req.params.itemid}})
    .then( data => {
      res.redirect(`/sellers/items`)
    })
    .catch( err => {
      res.send(err)
    })
  } 

  static changeStatus (req, res) {
    Item.findOne({where: {id: req.params.itemid}})
    .then( data => {
      if( data.isActive == true ) {
        return Item.update({isActive: false}, {where: {id: req.params.itemid}})
      } else {
        return Item.update({isActive: true}, {where: {id: req.params.itemid}})
      }
    })
    .then( data => {
      res.redirect(`/sellers/items`)
    })
    .catch( err => {
      res.send(err)
    })
  }
}

module.exports = SellerController