const Joi = require('joi')

module.exports = (req, res, next) => {
    if(req.body.password !== req.body.password2) {
        return res.status(400).json({
            message: 'Passwords must match'
        })
    }
    const schema = Joi.object().keys({
        name: Joi.string().min(3).max(20).required(),
        password: Joi.string().min(6).max(20).required(),
        email: Joi.string().email(),
        avatarURL: Joi.string().uri().trim()
    })    
    Joi.validate({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        avatarURL: req.body.avatarURL
    }, schema, function(err, value) {
        if(err) {
            return res.status(400).json(err.details[0].message)
        }
        next()     
    })    
}