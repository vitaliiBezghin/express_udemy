exports.createOrder = (req, res, next) => {
    req.user.getCart().then(cart => {
        return cart.getProducts()
    }).then(products => {
       return req.user.createOrder().then(order => {
           return order.addProducts(products.map(product => {
                product.orderItem = {quantity: product.cartItem.quantity}
                return product
            }))
        }).catch(err => {
            console.log(err)
            res.json(err)
        })
    }).then(orderResult => {
        res.json(orderResult)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
}