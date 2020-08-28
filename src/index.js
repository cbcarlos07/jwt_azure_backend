require('dotenv').config()
const server = require('./server');

server.listen(3210, () =>{
    console.log('Server teste de token Azure 3210');
})
