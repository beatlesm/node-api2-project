// implement your server here
// require your posts router and connect it here
const express = require('express')
const helmet = require('helmet');
const cors = require('cors')

const postRouter = require('./posts/posts-router')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/posts', postRouter)

server.use('*', (req, res) => {
    res.send(`Hello!`)
})

server.use((err, req, res, next) => { // eslint-disable-line   
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    })
})

module.exports = server
