const express = require('express')
const path = require("path");
const router = express.Router()
const rootDir = require("../util/path");
const productController = require('../controllers/productsController')


// router.get('/products', productController.index)
router.get('/products/:product_id', productController.show)
router.post('/products', productController.store)
// router.put('/products/:product_id', productController.update)
// router.delete('/products/:product_id', productController.destroy)

module.exports = router