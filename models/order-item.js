const Sequelize = require('sequelize')
const sequelize = require('../util/database')
const OrderItem = sequelize.define('orderItem', {
    id:{
        type: Sequelize.INTEGER,
        unsigned: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    quantity: Sequelize.INTEGER
})

module.exports = OrderItem