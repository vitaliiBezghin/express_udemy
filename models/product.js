const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    title: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    imageUrl: {
        type: String,
        require: true
    },
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
})

module.exports = mongoose.model('Product', productSchema)
// const mongoConnect = require('../util/database')
// const getDb = require('../util/database').getDb
// const mongodb = require('mongodb')
// const {ObjectId} = require("mongodb");
// class Product {
//     constructor(title, price, description, imageUrl, userId) {
//         this.title = title
//         this.price = price
//         this.description = description
//         this.imageUrl = imageUrl
//         this.userId = userId
//     }
//
//     save() {
//         const db = getDb()
//         return db.collection('products').insertOne(this).then(result => {
//             console.log(result)
//
//         }).catch(err => {
//             console.log(err)
//
//         })
//     }
//     static update(prodId, data) {
//         const db = getDb()
//         return db.collection('products').updateOne({_id: new ObjectId(prodId)}, {$set: data}).then(product => {
//
//         }).catch(err => {
//             console.log(err)
//         })
//     }
//     static findById(prodId) {
//         const db = getDb()
//         //next return last collection element
//         return db.collection('products').find({_id: new mongodb.ObjectId(prodId)}).next().then(product => {
//             return product
//         }).catch(err => {
//             console.log(err)
//         })
//     }
//
//     static fetchAll() {
//         const db = getDb()
//         return db.collection('products').find().toArray().then(products => {
//             return products
//         }).catch(err => {
//             console.log(err)
//         })
//     }
//
//     static deleteById(prodId) {
//         const db = getDb()
//         return db.collection('products').deleteOne({_id: new mongodb.ObjectId(prodId)}).then(products => {
//             return products
//         }).catch(err => {
//             console.log(err)
//         })
//     }
// }
//
// module.exports = Product