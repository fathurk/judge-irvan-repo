const express = require('express')
const BuyerController = require('../controllers/buyerController')
const buyer = express.Router()


buyer.get('/buyer', BuyerController.showAllItems)
buyer.get('/buyer/:buyerid/cart', BuyerController.showCart)
buyer.get('/buyer/:buyerid/checkout', BuyerController.checkout)
buyer.get('/buyer/:buyerid/delete/:cartid', BuyerController.deleteFromCart)
buyer.get('/buyer/:buyerid/changeprofile', BuyerController.changeProfile)
buyer.post('/buyer/:buyerid/changeprofile', BuyerController.postChangeProfile)
buyer.get('/buyer/:buyerid/:itemid/addtocart', BuyerController.addToCart)

module.exports = buyer