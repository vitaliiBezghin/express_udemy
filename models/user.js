const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unsigned: true,
        allowNull: false,
        primaryKey: true
    },
    firstname:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email_verified_at: {
        type: Sequelize.DATE,
        allowNull:true
    }
})

module.exports = User