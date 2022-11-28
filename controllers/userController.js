const User = require('../models/user')

exports.register = (req, res, next) => {
    const user = new User(req.body.firstname, req.body.lastname, req.body.email, req.body.phone, req.body.password)
    user.save().then(newUser => {
        res.json(newUser)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
}

exports.getById = (req, res, next) => {
    User.findById(req.params.user_id).then(user => {
        res.json(user)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
}