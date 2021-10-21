const express = require('express')
const BuyerController = require('../controllers/buyerController')
const buyer = express.Router()


buyer.get('/', BuyerController.showAllItems)
buyer.get('/:itemid/detail', BuyerController.showDetailItems)
buyer.get('/cart', BuyerController.showCart)
buyer.get('/checkout', BuyerController.checkout)
buyer.get('/delete/:cartid', BuyerController.deleteFromCart)
buyer.get('/changeprofile', BuyerController.changeProfile)
buyer.post('/changeprofile', BuyerController.postChangeProfile)
buyer.get('/:itemid/addtocart', BuyerController.addToCart)

module.exports = buyer