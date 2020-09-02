const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const auth = require('./routes/api/auth');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// Passport config
require('./config/passport')(passport);

// Database config
const db = require('./config/keys').mongoURL;

// Connect to MongoDB
mongoose.connect(db)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));


// Use Routes
app.use('/api/auth', auth);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));