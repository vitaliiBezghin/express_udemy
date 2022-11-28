const Product = require("../models/product");
const User = require("../models/user");
const {where} = require("sequelize");

exports.cart = (req, res, next) => {

}

exports.addToCart = async (req, res, next) => {
    Product.findById(req.body.productId).then(product => {
        return User.addToCart(req.user, product)
    }).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
}

exports.cartDecreaseProduct = (req, res, next) => {

}

exports.deleteFromCart = (req, res, next) => {

}