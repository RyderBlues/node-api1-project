// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model');

const server = express();

server.use(express.json());

// [GET] all users
server.get('/api/users', async (req, res) => {
    User.findAll()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({
                message: 'error getting users',
                error: err.message});
        });
    
})
module.exports = server; // EXPORT YOUR SERVER instead of {}
