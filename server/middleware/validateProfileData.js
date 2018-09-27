const Joi = require('joi')

module.exports = (req, res, next) => {
    
    const schema = Joi.object().keys({
        handle: Joi.string().min(2).max(40).required(),
        status: Joi.string().required(),
        skills: Joi.string().required(),
        website: Joi.string().uri().trim(),
        youtube: Joi.string().uri().trim(),
        facebook: Joi.string().uri().trim(),
        twitter: Joi.string().uri().trim(),
        linkedin: Joi.string().uri().trim(),
        instagram: Joi.string().uri().trim()
    })    
    Joi.validate({
        handle: req.body.handle,
        status: req.body.status,
        skills: req.body.skills,
        website: req.body.website,
        youtube: req.body.youtube,
        facebook: req.body.facebook,
        twitter: req.body.twitter,
        linkedin: req.body.linkedin,
        instagram: req.body.instagram
    }, schema, function(err, value) {
        if(err) {
            return res.status(400).json(err.details[0].message)
        }
        next()     
    })    
}