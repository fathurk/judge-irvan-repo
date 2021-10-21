const express = require('express')
const port = 3000
const router = require('./routers/index')
const app = express()
const multer = require('multer')
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require('cloudinary').v2
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'judge_irvan',
    allowedFormats: ["jpeg", "jpg", "png"]
  }
})

const upload = multer({ storage });

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(router)


app.listen(port, () => console.log(`Listening port ${port}`))

