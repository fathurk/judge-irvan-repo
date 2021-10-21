const express = require('express');
const AccountController = require('../controllers/accountController');
const buyer = require('./buyers');
const seller = require('./sellers');
const router = express.Router();

router.get('/', (req, res) => res.render('Landing'))
router.get('/login', AccountController.login)
router.post('/login', AccountController.postLogin)
router.get('/register', AccountController.register)
router.post('/register', AccountController.postRegister)
router.get('/logout', AccountController.logout)
router.use('/sellers', seller)
router.use('/buyers', buyer)


module.exports = router