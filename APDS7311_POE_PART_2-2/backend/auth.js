const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../backend/models/User');


// RegEx to whitelist usernames (alphanumeric only)
const usernamePattern = /^[a-zA-Z0-9]+$/;


// Get CSRF Token (frontend should fetch this and send it with requests)
router.get('/csrf-token', (req, res) => {
    res.status(200).send({ csrfToken: req.csrfToken() });
});

// Registration route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Validate username input using RegEx
    if (!usernamePattern.test(username)) {
        return res.status(400).send({ message: 'Invalid username' });
    }

    try {
        // Check if username is already taken
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ message: 'Username already taken' });
        }

        // Hash and salt the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user and save to the database
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error registering user' });
    }
});

// Login route (verify password)
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Validate username input using RegEx
    if (!usernamePattern.test(username)) {
        return res.status(400).send({ message: 'Invalid username' });
    }
    try {
        // Fetch the user from the database
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        // Check if the password is valid
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            res.status(200).send({ message: 'Login successful' });
        } else {
            res.status(401).send({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error logging in' });
    }
});

module.exports = router;
