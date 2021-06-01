// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model');

const server = express();

server.use(express.json());

// [GET] all users
server.get('/api/users',(req, res) => {
    User.find()
        .then(users => {
            if (!users) {
                res.status(500).json({message: 'The users information could not be retrieved'});
            } 
            else {
                res.json(users);
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'error getting users',
                error: err.message});
        });
    
})

// [GET] User by ID
server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                res.status(404).json({message: 'The user with the specified ID does not exist'}); 
            }
            res.json(user);
        })
        .catch(err => {
            res.status(500).json({
                message: 'The user information could not be retrieved',
                error: err.message});
        })
})

// [POST] New User
server.post('/api/users', (req, res) => {
    User.insert(req.body)
        .then(user => {
            if (!req.body.name || !req.body.bio) {
                res.status(404).json({message: 'Please provide name and bio for the user'});
            }
            else {
                res.status(200).json(user);
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'There was an error while saving the user to the database',
                error: err.message});
        })
})

// [PUT] Updates User
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { body } = req;
    User.update(id, body)
        .then(user => {
            if (!user) {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist'
                })
            }
            else if (!req.body.name || !req.body.bio ){
                res.status(400).json({
                    message: 'Please provide name and bio for the user'
                })
            }
            else {
                res.status(200).json(user);
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'error updating user',
                error: err.message});
        })
})
//[DELETE] a user by Id

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    User.remove(id)
        .then(user => {
            if (!user) {
                res.status(404).json({ message: 'The user with the specified ID does not exist'});
            }
            else {
                res.json(user);
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'The user could not be removed',
                error: err.message
            })
        })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
