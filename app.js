const express = require('express')
const bodyParser = require('body-parser')
const path = require("path")
const app = express()
const shop = require('./routes/shop')
const admin = require('./routes/admin')
const userRoutes = require('./routes/user')
const rootDir = require("./util/path")
const orderRoutes = require('./routes/order')
const mongoConnect = require('./util/database').mongoConnect
const UserModel = require('./models/user')
const mongoose = require('mongoose')

app.use((req, res, next) => {
    UserModel.findById('63919a8b364ff45d1e332bf6').then(user => {
        req.user = user
        next()
    }).catch(err => {
        console.log(err)
        next()
    })
})
app.use(bodyParser.urlencoded({extended: false}))

app.use('/admin', admin)
// app.use('/shop', shop)
// app.use('/user', userRoutes)
// app.use('/order', orderRoutes)
// app.use(express.static(path.join(__dirname, 'public')))
/*
* 404 page
* */
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://Vitalii_Bezghin:Qw8hy4PfVqdoei1r@cluster0.lrwgdo8.mongodb.net/shop');
    // const user = new UserModel({
    //     firstname: 'Test',
    //     lastname: 'Test 2',
    //     email: 'test@ukr.net',
    //     phone: '09312054123',
    //     password: '123123',
    //     cart: {
    //         items: []
    //     }
    // })
    // user.save()
    app.listen(8000)
    console.info("Connected !")
}
