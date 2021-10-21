const express = require('express')
const SellerController = require('../controllers/sellerController')
const seller = express.Router()

const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require("multer-storage-cloudinary");


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
seller.get('/items', SellerController.showAllItems)
seller.get('/items/add', SellerController.addItems)
seller.post('/items/add', upload.single('imageUrl'), SellerController.postAdditems)
seller.get('/changeprofile', SellerController.changeProfile)
seller.post('/changeprofile', SellerController.postChangeProfile)
seller.get('/:itemid/delete', SellerController.deleteItems)
seller.get('/:itemid/edit', SellerController.editItems)
seller.post('/:itemid/edit', upload.single('imageUrl'), SellerController.postEditItems)
seller.get('/:itemid/changestatus', SellerController.changeStatus)


module.exports = seller