const express = require('express');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const authRoutes = require('./backend/auth');
const path = require('path');
const app = express();
const connectDB = require('./backend/db');


app.use(express.static('public'));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(csrf({ cookie: true }));

// Handle CSRF Errors
app.use((err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
        res.status(403).send({ message: 'Invalid CSRF token' });
    } else {
        next(err);
    }
});

// Use authentication routes
app.use('/auth', authRoutes);

// Connect to MongoDB
connectDB();

// index page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
