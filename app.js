const express = require('express')
const bodyParser = require('body-parser')
const path = require("path");
const app = express()
const shop = require('./routes/shop')
const admin = require('./routes/admin')
const rootDir = require("./util/path");
const sequelize = require('./util/database')
const Product = require('./models/product')
const User = require('./models/user')
const dbManipulations = require('./util/dbManipulations')
const orderRoutes = require('./routes/order')
/*
* dbManipulations
* */
dbManipulations.setRelations()
/*
* Make synchronization all models
* */
// sequelize.sync()
// sequelize.sync({force: true})
    //Seeding a new test user1
    //     .then(() => {
    //     User.create({
    //         firstname: 'Vitalii',
    //         lastname: 'Bezghin',
    //         email: 'vitaliibezghin@gmail.com',
    //         password: '123123',
    //         phone: '0931205426',
    //     })
    // })
/*
*
* */
app.use(bodyParser.urlencoded({extended: false}))
app.use(function (req, res, next) {
    User.findByPk(1).then(u => {
        req.user = u
        next()
    }).catch(err => {
        console.log(err)
        next()
    })
})
/*
* Shop routes
* */
app.use('/admin', admin)
app.use(shop)
app.use('/order', orderRoutes)
app.use(express.static(path.join(__dirname, 'public')))
/*
* 404 page
* */
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})
app.listen('8002', 'localhost')
