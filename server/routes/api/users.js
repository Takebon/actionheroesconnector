
const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const Profile = require('../../models/Profile')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const checkAuth = require('../../middleware/checkAuth')
const validateUserData = require('../../middleware/validateUserData')

router.post('/register', validateUserData, (req, res, next) => {
    
    User
        .findOne({email: req.body.email})
        .exec()
        .then(user => {
            if(user) {
                return res.status(400).json({
                    message: 'Email already exists'
                })
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    if(err) throw err
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if(err) {
                            res.status(500).json({
                                error: err
                            })} else {
                                const newUser = new User({
                                    name: req.body.name,
                                    email: req.body.email,
                                    avatarURL: req.body.avatarURL,
                                    password: hash
                                })
                                newUser
                                    .save()
                                    .then(result => {
                                        res.json({
                                            result,
                                            message: 'User created'
                                        })
                                    })
                                    .catch(err => {
                                        console.log(err)
                                        res.status(500).json({error: err})
                                    })

                            }
                        
                    })
                })
                
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
})

router.post('/login', (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    User
        .findOne({email})
        .exec()
        .then(user => {
            if(!user) {
                return res.status(404).json({
                    message: 'User is not found'
                })
            }
            bcrypt
                .compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatarURL: user.avatarURL
                        }
                        jwt.sign(payload, keys.secretOrKey, { expiresIn: '1h'}, (err, token) => {
                            if(err) throw err
                            res.json({
                                message: 'Success',
                                token: 'Bearer '+ token
                            })
                        })
                        
                    } else {
                        return res.status(401).json({
                            message: 'Password incorrect'
                        })
                    }
                })
        })
})

router.get('/curent', checkAuth, (req, res, next) => {
    User
        .findById(req.user.id)
        .select('name email avatarURL _id')
        .exec()
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
})

router.delete('/', checkAuth, (req, res) => {
    Profile
        .findOneAndDelete({user: req.user.id})
        .then(() => {
            User
            .findByIdAndDelete(req.user.id)
            .then(() => {
                res.json({
                    message: 'User and profile deleted'
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({error: err})
            })
        })    
})


module.exports = router