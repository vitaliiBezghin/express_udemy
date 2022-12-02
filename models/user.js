const mongodb = require('mongodb')
const getDb = require('../util/database').getDb

class User {
    constructor(
        _id,
        firstname,
        lastname,
        email,
        phone,
        password,
        cart
    ) {
        this._id = _id
        this.firstname = firstname
        this.lastname = lastname
        this.email = email
        this.phone = phone
        this.password = password
        this.cart = cart
    }

    save() {
        const db = getDb()
        return db.collection('users').insertOne(this).then(newUser => {
            return newUser
        }).catch(err => {
            console.log(err)
        })
    }

    getCart() {
        const db = getDb()
        const productIds = this.cart.items.map(product => {
            return product.productId
        })
        let totalPrice = 0
        return db.collection('products').find({
            _id: {
                $in: productIds
            }
        }).toArray().then(products => {
            const cart = products.map(product => {
                for (let i = 0; i < this.cart.items.length; i++) {
                    if (this.cart.items[i].productId.toString() === product._id.toString()) {
                        product.quantity = this.cart.items[i].quantity
                        product.productTotalPrice = product.price * this.cart.items[i].quantity
                        totalPrice += product.productTotalPrice
                    }
                }

                return product
            })
            return cart
        }).catch(err => {
            console.log(err)
        })
    }

    addItemToCart(product) {
        const db = getDb()
        if (Object.hasOwn(this.cart, 'items')) {
            const cartItemExistIndex = this.cart.items.findIndex(ci => {
                return ci.productId.toString() === product._id.toString()
            })

            const updatedCartItems = [...this.cart.items]

            if (cartItemExistIndex > -1) {
                updatedCartItems[cartItemExistIndex].quantity = this.cart.items[cartItemExistIndex].quantity + 1
            } else {
                updatedCartItems.push({productId: product._id, quantity: 1})
            }

            const updatedCart = {items: updatedCartItems}
            return db.collection('users').updateOne(
                {_id: new mongodb.ObjectId(this._id)},
                {$set: {cart: updatedCart}}
            )
        } else {
            const updatedCart = {items: [{productId: product._id, quantity: 1}]}
            return db.collection('users').updateOne(
                {_id: new mongodb.ObjectId(this._id)},
                {$set: {cart: updatedCart}}
            )
        }

    }

    deleteItemFromCart(productId) {
        const db = getDb()
        const updatedCart = {items: [...this.cart.items.filter(product => product.productId != productId)]}
        return db.collection('users').updateOne(
            {_id: new mongodb.ObjectId(this._id)},
            {$set: {cart: updatedCart}}
        )
    }

    decreaseProductQuantity(productId) {
        const db = getDb()
        const resultCart = this.cart.items.filter((product, index) => {
            if (product.productId == productId) {
                if (product.quantity > 1) {
                    product.quantity -= 1
                } else {
                    return;
                }
            }
            return product
        })
        const updatedCart = {items: resultCart}

        return db.collection('users').updateOne(
            {_id: new mongodb.ObjectId(this._id)},
            {$set: {cart: updatedCart}}
        )
    }

    getOrders() {
        return getDb().collection('orders').find({'user._id': mongodb.ObjectId(this._id)}).toArray()
    }
    addOrder() {
        const db = getDb()
       return this.getCart().then(cartProducts => {
           if (cartProducts.length == 0) {
               throw {
                   message: "Can't create order . Cart is empty ."
               }
           }
            const order = {
                items: cartProducts,
                user:{
                    _id: new mongodb.ObjectId(this._id),
                }
            }
            return db.collection('orders').insertOne(order)
        }).then(result => {
            this.cart = {items: []}
            return db.collection('users').updateOne(
                {_id: new mongodb.ObjectId(this._id)},
                {$set: {cart: {items: []}}}
            )
        })
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