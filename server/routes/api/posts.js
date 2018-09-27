const express = require('express')
const router = express.Router()
const checkAuth = require('../../middleware/checkAuth')
const validatePostData = require('../../middleware/validatePostData')


const Post = require('../../models/Post')


router.get('/', (req, res) => {
    Post
        .find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
})

router.get('/:id', (req, res) => {
    Post
        .findById(req.params.id)        
        .then(post => {
            if(post === null){
                res.status(404).json({
                    message: "No posts found"
                })
            }
            res.json(post)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
})

router.post('/',validatePostData, checkAuth, (req, res) => {
    const newPost = new Post({
        text: req.body.text,
        name: req.user.name,
        avatarURL: req.user.avatarURL,
        user: req.user.id
    })

    newPost
        .save()
        .then(post => res.json(post))
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
})

router.delete('/:id', checkAuth, (req, res) => {
    Post
        .find({ user: req.user.id })
        .then(posts => {            
            if(posts.length === null || posts.length === 0) {
                return res.status(404).json({ message: 'No post found for this user'})
            }
            postToDelete = posts.filter(post => post.id == req.params.id) 
                if(postToDelete.length === 0 ||postToDelete.length === null) {
                    return res.status(401).json({
                        message: 'Not allowed to delete this post'
                    })
                }
            Post
                .findByIdAndDelete(postToDelete[0].id)
                .then(() => res.json({ message: 'Post deleted'}))
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
})

router.post('/like/:id', checkAuth, (req, res) => {
    Post
        .findById(req.params.id)
        .then(post => {
            if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                return res.status(400).json({ message: 'User already liked this post'})
            }
            post.likes.unshift({ user: req.user.id })
            post
                .save()
                .then(post => res.json(post))
                .catch((err) => res.status(500).json({error: err}))
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
})

router.post('/unlike/:id', checkAuth, (req, res) => {
    Post
        .findById(req.params.id)
        .then(post => {
            if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                return res.status(400).json({ message: 'You have not yet liked this post'})
            }
            const removeIndex = post.likes
                .map(item => item.user.toString())
                .indexOf(req.user.id)

            post.likes.splice(removeIndex, 1)
            post
                .save()
                .then(post => res.json(post))
                .catch((err) => res.status(500).json({error: err}))
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
})

router.post('/comment/:id', validatePostData, checkAuth, (req, res) => {
    Post
        .findById(req.params.id)
        .then(post => {
            const newComment = {
                user: req.user.id,
                text: req.body.text,
                name: req.user.name,
                avatarURL: req.user.avatarURL
            }
            post.comments.unshift(newComment)
            post
                .save()
                .then(post => res.json(post))
                .catch((err) => res.status(500).json({error: err}))
        })
        .catch((err) => res.status(500).json({error: err}))
})

router.delete('/comment/:id/:comment_id', checkAuth, (req, res) => {
    Post
        .findById(req.params.id)
        .then(post => {
            
            if(post.comments.filter(comment => comment.id.toString() === req.params.comment_id).length = 0) {
                return res.status(404).json({ message: 'Comment does not exist' })
            }
            const removeIndex = post.comments
                .map(item => item.id.toString())
                .indexOf(req.params.comment_id)
            
            
            if(post.comments[removeIndex].user.toString() !== req.user.id.toString()) {
                return res.status(400).json({
                    message: 'Not allowed to delete'
                })
            }
            
            post.comments.splice(removeIndex, 1)
            post
                .save()
                .then(post => res.json(post))
                .catch((err) => res.status(500).json({error: err}))

        })
        .catch((err) => res.status(500).json({error: err}))
})

module.exports = router
