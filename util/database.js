const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('udemy_express', 'root', 'bezgin26', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize