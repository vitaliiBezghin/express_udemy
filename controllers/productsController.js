const path = require("path");
const rootDir = require("../util/path");
const Product = require('../models/product')

exports.index = (req, res, next) => {
    Product.findAll().then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err)
        res.json('Something went wrong ... ');
    })
}
exports.store = (req, res, next) => {
    Product.create({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        userId: req.body.userId
    }).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
}
exports.update = (req, res, next) => {
    Product.update({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl
    }, {
        where: {id: req.params.product_id}
    }).then(() => {
        res.sendStatus(204)
        res.end()
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
}
exports.show = (req, res, next) => {
    Product.findByPk(req.params.product_id)
        .then(result => {
            res.json(result)
        }).catch(err => {
        console.log(err)
        res.json('Something went wrong ... ');
    })
}

exports.destroy = (req, res, next) => {
    Product.destroy({
        where: {id: req.params.product_id}
    }).then(() => {
        res.sendStatus(204)
        res.end()
    }).catch(err => {
        console.log(err)
        res.json('Something went wrong ... ');
    })
}
