const Product = require("../models/product");
const User = require("../models/user");
const CartItem = require('../models/cart-item')
const Cart = require('../models/cart')
const {where} = require("sequelize");

exports.cart = (req, res, next) => {
    req.user.getCart({include: Product}).then(cart => {
        res.json(cart)
    }).catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
}

exports.addToCart = async (req, res, next) => {
    req.user.getCart().then(cart => {
        if (cart) {
            cart.getProducts({
                where: {
                    id: req.body.productId
                }
            }).then(products => {
                let product;
                if (products.length > 0) {
                    product = products[0]
                }
                if (product) {
                    let oldQuantity = product.cartItem.quantity
                    let newQuantity = oldQuantity + 1
                    cart.addProduct(product, {through: {quantity: newQuantity}}).then(() => {
                        cart.getProducts().then(products => {
                            res.json(products)
                        })
                    })
                } else {
                    req.user.getProducts({
                        where: {
                            id: req.body.productId
                        }
                    }).then(p => {
                        cart.addProduct(p, {through: {quantity: 1}}).then(() => {
                            cart.getProducts().then(products => {
                                res.json(products)
                            })
                        })
                    })
                }
            })
        } else {
            req.user.createCart().then(newCart => {
                req.user.getProducts({
                    where: {
                        id: req.body.productId
                    }
                }).then(p => {
                    newCart.addProduct(p, {through: {quantity: 1}}).then(c => {
                        newCart.getProducts().then(products => {
                            res.json(products)
                        })
                    })
                })
            })
        }
    })
}

exports.cartDecreaseProduct = (req, res, next) => {
    req.user.getCart().then(cart => {
        cart.getProducts({
            where:{
                id: req.body.productId
            }
        }).then(products => {
            const product = products[0]
            if (product.cartItem.quantity === 1) {
                cart.removeProduct(product).then(() => {
                    return cart.getProducts()
                })
            }
           return  product.cartItem.update({
                quantity: product.cartItem.quantity - 1
            })
        }).then(() => {
           return  cart.getProducts()
        }).then(result =>{
            res.json(result)
        })
    })
}

exports.deleteFromCart = (req, res, next) => {
    req.user.getCart().then(cart => {
        return cart.getProducts({
            where: {
                id: req.body.productId
            }
        })
    }).then(products => {
        const product = products[0]
        product.cartItem.destroy().then(() => {
            res.status(204).send()
        }).catch(err => {
            res.status(400)
            res.json({
                message: "Can't delete product !"
            })
        })
    }).catch(err => {
        res.status(400)
        res.json({
            message: "Can't delete product !"
        })
    })
}