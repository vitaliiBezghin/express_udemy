const path = require("path");
const rootDir = require("../util/path");
const Product = require('../models/product')
const mongodb = require('mongodb')
exports.index = (req, res, next) => {
    Product.fetchAll().then(products => {
        res.json(products)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
}
exports.store = (req, res, next) => {
    const product = new Product(req.body.title, req.body.imageUrl, req.body.description, req.body.price, new mongodb.ObjectId(req.user._id))
    product.save().then(product => {
        res.json(product)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
}

exports.update = (req, res, next) => {
    Product.update(req.params.product_id, {
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        price: req.body.price,
    }).then(product => {
        res.json(product)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
}

exports.show = (req, res, next) => {
    Product.findById(req.params.product_id).then(product => {
        res.json(product)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
}

exports.destroy = (req, res, next) => {
   Product.deleteById(req.params.product_id).then(result => {
       res.json(result)
   }).catch(err => {
       console.log(err)
       res.json(err)
   })
}
