const express = require('express')
const BuyerController = require('../controllers/buyerController')
const isBuyer = require('../middlewares/isBuyer')
const isLogin = require('../middlewares/isLogin')
const buyer = express.Router()


buyer.get('/', isLogin, isBuyer ,BuyerController.showAllItems)
buyer.get('/:itemid/detail', isLogin, isBuyer, BuyerController.showDetailItems)
buyer.get('/cart', isLogin, isBuyer, BuyerController.showCart)
buyer.get('/checkout', isLogin, isBuyer, BuyerController.checkout)
buyer.get('/delete/:cartid', isLogin, isBuyer, BuyerController.deleteFromCart)
buyer.get('/changeprofile', isLogin, isBuyer, BuyerController.changeProfile)
buyer.post('/changeprofile', isLogin, isBuyer, BuyerController.postChangeProfile)
buyer.get('/:itemid/addtocart', isLogin, isBuyer, BuyerController.addToCart)

module.exports = buyer