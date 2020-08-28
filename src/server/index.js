const express = require('express')
const verificarJWT = require('./jwtAzure')
const verify = require('./jwt')

verificarJWT()
verify()
const server = express()

server.get('/', (req, res, next)=>{
    res.send({msg: 'Token'})
})



module.exports = server