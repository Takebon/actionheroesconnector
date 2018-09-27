const Joi = require('joi')

module.exports = (req, res, next) => {
    
    const schema = Joi.object().keys({
        title: Joi.string().required(),
        company: Joi.string().required(),       
        from: Joi.string().required()              
    })    
    Joi.validate({
        title: req.body.title,
        company: req.body.company,       
        from: req.body.from             
    }, schema, function(err, value) {
        if(err) {
            return res.status(400).json(err.details[0].message)
        }
        next()     
    })    
}