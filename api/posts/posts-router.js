// implement your posts router here
const router = require("express").Router()

const Post = require('./posts-model')

router.get('/', (req, res, next) => {    
    Post.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(() => {
            res.json({ message: "The posts information could not be retrieved" })
        })
})

module.exports = router
