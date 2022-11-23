const Product = require("../models/product");
const User = require("../models/user");
const Cart = require('../models/cart')
const CartItem = require('../models/cart-item')
const OrderItem = require('../models/order-item')
const Order = require('../models/order')
/*
* Make a relations
* */
exports.setRelations = () => {
    //Product
    Product.belongsTo(User, {
        constraints: true,
        onDelete: 'cascade',
        foreignKey: {
            allowNull: false
        }
    })
    Product.belongsToMany(Cart, {through: CartItem})
    Product.belongsToMany(Order, {through: OrderItem})

    //User
    User.hasMany(Product)
    User.hasOne(Cart)
    User.hasMany(Order)

    //Cart
    Cart.belongsTo(User, {
        constraints: true,
        onDelete: 'cascade',
        foreignKey: {
            allowNull: false
        }
    })
    Cart.belongsToMany(Product, {through: CartItem})

    //Order
    Order.belongsTo(User)
    Order.belongsToMany(Product, {through: OrderItem})
}