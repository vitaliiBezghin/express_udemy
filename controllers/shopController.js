const Product = require("../models/product");
const User = require("../models/user");
const {where} = require("sequelize");
const mongodb = require('mongodb')

exports.cart = async (req, res, next) => {
    res.json(await req.user.getCart())
}

exports.addToCart = async (req, res, next) => {
   const product = await Product.findById(req.body.productId)
  res.json(await req.user.addItemToCart(product))
}

exports.decreaseProductQuantity = async (req, res, next) => {
    res.json(await req.user.decreaseProductQuantity(req.body.productId))
}

exports.deleteFromCart = async (req, res, next) => {
    res.json(await req.user.deleteItemFromCart(req.body.productId))
}