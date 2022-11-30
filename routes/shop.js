const express = require('express')
const path = require('path')
const rootDir = require("../util/path");
const router = express.Router()
const shopController = require('../controllers/shopController')
router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'shop.html'))
})
router.get('/getCart', shopController.cart)
router.post('/addToCart', shopController.addToCart)
router.patch('/cartDecreaseProduct', shopController.decreaseProductQuantity)
router.delete('/deleteFromCart', shopController.deleteFromCart)

module.exports = router