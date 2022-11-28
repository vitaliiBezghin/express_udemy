const express = require('express')
const bodyParser = require('body-parser')
const path = require("path")
const app = express()
const shop = require('./routes/shop')
const admin = require('./routes/admin')
const userRoutes = require('./routes/user')
const rootDir = require("./util/path")
// const orderRoutes = require('./routes/order')
const mongoConnect = require('./util/database').mongoConnect
const UserModel = require('./models/user')

app.use((req, res, next) => {
    UserModel.findById('63847f69f664d247d9e6df09').then(user => {
        req.user = user
        next()
    }).catch(err => {
        console.log(err)
    })
})
app.use(bodyParser.urlencoded({extended: false}))

app.use('/admin', admin)
app.use('/shop', shop)
app.use('/user', userRoutes)
// app.use(shop)
// app.use('/order', orderRoutes)
// app.use(express.static(path.join(__dirname, 'public')))
/*
* 404 page
* */
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})


mongoConnect(() => {
    app.listen(8000)
})