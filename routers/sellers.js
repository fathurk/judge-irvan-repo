const express = require('express')
const SellerController = require('../controllers/sellerController')
const seller = express.Router()

const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const isLogin = require('../middlewares/isLogin')
const isSeller = require('../middlewares/isSeller')


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
seller.get('/items', isLogin, isSeller,  SellerController.showAllItems)
seller.get('/items/add', isLogin, isSeller, SellerController.addItems)
seller.post('/items/add', isLogin, isSeller, upload.single('imageUrl'), SellerController.postAdditems)
seller.get('/changeprofile', isLogin, isSeller, SellerController.changeProfile)
seller.post('/changeprofile', isLogin, isSeller, SellerController.postChangeProfile)
seller.get('/:itemid/delete', isLogin, isSeller, SellerController.deleteItems)
seller.get('/:itemid/edit', isLogin, isSeller, SellerController.editItems)
seller.post('/:itemid/edit', isLogin, isSeller, upload.single('imageUrl'), SellerController.postEditItems)
seller.get('/:itemid/changestatus', isLogin, isSeller, SellerController.changeStatus)


module.exports = seller