const Sequelize = require('sequelize')
const sequelize = require('../util/database')
const Cart = sequelize.define('cart', {
    id:{
        type: Sequelize.INTEGER,
        unsigned: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
})

module.exports = Cart