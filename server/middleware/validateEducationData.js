const Joi = require('joi')

module.exports = (req, res, next) => {
    
    const schema = Joi.object().keys({
        school: Joi.string().required(),
        degree: Joi.string().required(),       
        fieldofstudy: Joi.string().required(),       
        from: Joi.string().required()              
    })    
    Joi.validate({
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from             
    }, schema, function(err, value) {
        if(err) {
            return res.status(400).json(err.details[0].message)
        }
        next()     
    })    
}