const path = require("path");
const rootDir = require("../util/path");
const Product = require('../models/product')
const mongodb = require('mongodb')

// exports.index = (req, res, next) => {
//     Product.fetchAll().then(products => {
//         res.json(products)
//     }).catch(err => {
//         console.log(err)
//         res.json(err)
//     })
// }
exports.store = (req, res, next) => {
    try {
        const product = new Product({
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            user_id: new mongodb.ObjectId(req.user._id)
        })
        product.save(function (error) {
            if (error) {
                return res.json(error)
            }

            res.json(product)
        })
    }catch (err) {
        console.log(err)
        res.json(err)
    }
}

// exports.update = (req, res, next) => {
//     Product.update(req.params.product_id, {
//         title: req.body.title,
//         imageUrl: req.body.imageUrl,
//         description: req.body.description,
//         price: req.body.price,
//     }).then(product => {
//         res.json(product)
//     }).catch(err => {
//         console.log(err)
//         res.json(err)
//     })
// }
//
exports.show = (req, res, next) => {
    try {
        const product = Product.findOne({
            _id: new mongodb.ObjectId(req.params.product_id)
        }).populate('user_id').exec(function (err, product) {
            if (err) {
                return res.json(err)
            }
            return res.json(product)

        })
    }catch (err) {
        console.log(err)
        res.json(false)
    }
}
//
// exports.destroy = (req, res, next) => {
//     Product.deleteById(req.params.product_id).then(result => {
//         res.json(result)
//     }).catch(err => {
//         console.log(err)
//         res.json(err)
//     })
// }
