const express = require('express')
const router = express.Router()
const checkAuth = require('../../middleware/checkAuth')
const validateProfileData = require('../../middleware/validateProfileData')
const validateExperienceData = require('../../middleware/validateExperienceData')
const validateEducationData = require('../../middleware/validateEducationData')

const Profile = require('../../models/Profile')

router.get('/', checkAuth, (req, res, next) => {
    Profile
        .findOne({user: req.user.id})
        .populate('user', ['name', 'avatarURL'])
        .then(profile => {
            if(!profile) {
               return res.status(404).json({
                   message: 'There is no profile for this user'
               }) 
            }
            res.status(200).json(profile)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
})

router.get('/all', (req, res) => {
    Profile
        .find()
        .populate('user', ['name', 'avatarURL'])
        .then(profiles => {
            if(!profiles) {
                return res.status(404).json({
                    message: 'There are no profiles'
                })
            }
            res.json(profiles)
        })
        .catch(err => res.status(404).json({ message: 'There are no profiles'}))  
})

router.get('/handle/:handle', (req, res) => {
    Profile
        .findOne({ handle: req.params.handle })
        .populate('user', ['name', 'avatarURL'])
        .then(profile => {
            if(!profile) {
                return res.status(404).json({
                    message: 'There is no profile for this user'
                })
            }
            res.status(200).json(profile)
        })
        .catch(err => res.status(404).json({ message: 'There is no profile for this handle'}))  
})

router.get('/:user_id', (req, res) => {
    Profile
        .findOne({ user: req.params.user_id })
        .populate('user', ['name', 'avatarURL'])
        .exec()
        .then(profile => {            
            if(!profile) {
                return res.status(404).json({
                    message: 'There is no profile for this user'
                })
            }
            res.status(200).json(profile)
        })
        .catch(err => res.status(404).json({ message: 'There is no profile for this user'}))      
})

//create and update
router.post('/', validateProfileData, checkAuth, (req, res, next) => {

    const profileFields = {}
    profileFields.user = req.user.id
    if(req.body.handle) profileFields.handle = req.body.handle
    if(req.body.company) profileFields.company = req.body.company
    if(req.body.website) profileFields.website = req.body.website
    if(req.body.location) profileFields.location = req.body.location
    if(req.body.bio) profileFields.bio = req.body.bio
    if(req.body.status) profileFields.status = req.body.status
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername

    if(typeof req.body.skills !== 'undefined') {profileFields.skills = req.body.skills.split(',')}

    profileFields.social = {}
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram

    Profile
        .findOne({user: req.user.id})
        .exec()
        .then(profile => {
            if(profile) {                
                Profile                    
                    .findOneAndUpdate({user: req.user.id}, { $set: profileFields }, { new: true })
                    .exec()
                    .then(profile => {
                        res.status(200).json(profile)
                    })
            } else {                
                Profile
                    .findOne({ handle: profileFields.handle })
                    .exec()
                    .then(profile => {
                        if(profile) {                            
                            return res.status(400).json({
                                message: 'That handle already exists'
                            })
                        }                        
                        new Profile(profileFields)
                            .save()
                            .then(profile => {
                                res.status(200).json(profile)
                            })
                            .catch(err => {
                                console.log(err)
                                res.status(500).json({error: err})
                            })
                    })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })

})

router.post('/experience', validateExperienceData, checkAuth, (req, res) => {
    Profile
        .findOne({ user: req.user.id })
        .then(profile => {
            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }
            profile.experience.unshift(newExp)
            profile
                .save()
                .then(profile => res.json(profile))
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
})

router.post('/education', validateEducationData, checkAuth, (req, res) => {
    Profile
        .findOne({ user: req.user.id })
        .then(profile => {
            const newEdu = {
                school: req.body.school,
                degree: req.body.degree,
                fieldofstudy: req.body.fieldofstudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }
            profile.education.unshift(newEdu)
            profile
                .save()
                .then(profile => res.json(profile))
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
})

router.delete('/experience/:exp_id', checkAuth, (req, res) => {
    Profile
        .findOne({ user: req.user.id })
        .then(profile => {
            const removeIndex = profile.experience
                .map(item => item.id)
                .indexOf(req.params.exp_id)

                profile.experience.splice(removeIndex, 1)
                profile
                    .save()
                    .then(profile => res.json(profile))
                    .catch(err => res.status(404).json(err))
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
})

router.delete('/education/:edu_id', checkAuth, (req, res) => {
    Profile
        .findOne({ user: req.user.id })
        .then(profile => {
            const removeIndex = profile.education
                .map(item =>  item.id)
                .indexOf(req.params.edu_id)

                profile.education.splice(removeIndex, 1)
                profile
                    .save()
                    .then(profile => res.json(profile))
                    .catch(err => res.status(404).json(err))
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
})

router.delete('/', checkAuth, (req, res) => {
    Profile
        .findOneAndDelete({ user: req.user.id})
        .then(() => {
            res.json({ message: 'Profile deleted'})            
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })

})




module.exports = router