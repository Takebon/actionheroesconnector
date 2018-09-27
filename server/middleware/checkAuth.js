const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const User = require('../models/User')

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, keys.secretOrKey)
        req.user = decoded
        
    }
    catch(error){
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
    User
        .findById(req.user.id)
        .then(user => {
            if(!user) {
                return res.status(404).json({
                    message: 'User not found'
                })
            }
            next()
        })    
}