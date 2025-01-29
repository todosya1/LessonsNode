const express = require('express');
const router = express.Router();
const data = require('../data');

// GET /api/users - Get all users
router.get('/', (req, res) => {
    res.json(data.users);
});

// GET /api/users/:id - Get user by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = data.users.find(item => item.id === parseInt(id));
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: `User with ID: ${id} not found` });
    }
});

// POST /api/users - Add new user
router.post('/', (req, res) => {
    const userData = req.body;
    data.users.push(userData);
    res.json({ message: 'User added', users: data.users });
});

// PUT /api/users/:id - Update user
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const userData = req.body;
    const userInd = data.users.findIndex(item => item.id === parseInt(id));
    
    if (userInd !== -1) {
        data.users[userInd] = userData;
        res.json({ message: `User with ID: ${id} updated`, users: data.users });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const userInd = data.users.findIndex(item => item.id === parseInt(id));
    
    if (userInd !== -1) {
        data.users.splice(userInd, 1);
        res.json({ message: `User with ID: ${id} deleted`, users: data.users });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

module.exports = router;