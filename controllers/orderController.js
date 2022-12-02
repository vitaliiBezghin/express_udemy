exports.createOrder =  (req, res, next) => {
    req.user.addOrder().then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
}

exports.getOrders = (req, res, next ) => {
    req.user.getOrders().then(orders => {
        res.json(orders)
    }).catch(err => {
        console.log(err)
        res.json('Something went wrong ...')
    })
}