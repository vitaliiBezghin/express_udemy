const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Order = sequelize.define('orders', {
    id: {
        type: Sequelize.INTEGER,
        unsigned: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
})

module.exports = Order