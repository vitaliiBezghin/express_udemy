const mongodb = require('mongodb')
const getDb = require('../util/database').getDb

class User {
    constructor(firstname, lastname, email, phone, password) {
        this.firstname = firstname
        this.lastname = lastname
        this.email = email
        this.phone = phone
        this.password = password
    }

    save() {
        const db = getDb()
      return db.collection('users').insertOne(this).then(newUser => {
            return newUser
        }).catch(err => {
            console.log(err)
        })
    }
   static addToCart(user, product) {
       const db = getDb()
        if (Object.hasOwn(user, 'cart')) {
            const cartItemExistIndex = user.cart.items.findIndex(ci => {
                return ci.productId.toString() === product._id.toString()
            })

            const updatedCartItems = [...user.cart.items]

            if (cartItemExistIndex > -1) {
                updatedCartItems[cartItemExistIndex].quantity = user.cart.items[cartItemExistIndex].quantity + 1
            }else{
                updatedCartItems.push({productId: product._id, quantity: 1})
            }

            const updatedCart = {items: updatedCartItems}
            return db.collection('users').updateOne(
                {_id: new mongodb.ObjectId(user._id)},
                {$set: {cart: updatedCart}}
            )

        }else {
            const updatedCart = {items: [{productId: product._id, quantity: 1}]}
            return db.collection('users').updateOne(
                {_id: new mongodb.ObjectId(user._id)},
                {$set: {cart: updatedCart}}
            )
        }
    }
    static findById(userId) {
        const db = getDb()
       return db.collection('users').find({_id: new mongodb.ObjectId(userId)}).next().then(user => {
            return user
        }).catch(err => {
            console.log(err)
        })
    }


}

module.exports = User