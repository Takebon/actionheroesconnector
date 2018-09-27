const Joi = require('joi')

module.exports = (req, res, next) => {
    
    const schema = Joi.object().keys({
        name: Joi.string().min(2).max(40),
        text: Joi.string().min(5).max(300).required(),        
        avatarURL: Joi.string().uri().trim()
    })    
    Joi.validate({
        name: req.body.name,
        text: req.body.text,        
        avatarURL: req.body.avatarURL
    }, schema, function(err, value) {
        if(err) {
            return res.status(400).json(err.details[0].message)
        }
        next()     
    })    
}