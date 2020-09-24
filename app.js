// APIs:
// Register  --
//    1. relative url:  /home/register      absolute url: http://localhost:3000/home/register
//    2. method:  POST
//    3. HTTP request Header: Content-Type application/json
//    4. HTTP request Body example, all the following field should be filled
//          NOTE: password should be 123456 now to avoid further headache when testing login,
//          password2 should be the same as password1, which aims at confirming the password
//            {
//              "first_name": "TomCat",
//              "family_name": "One",
//              "email": "12312@gmail.com",
//              "password": "123456",
//              "password2": "123456"
//            }
//     5. send the HTTP request
//
// Login --
//       1. relative url:  /home/login       absolute url: http://localhost:3000/home/login
//       2. method:  POST
//       3. HTTP request Header: Content-Type application/json
//       4. HTTP request Body example, all the following field should be filled
//                 {
//                    "email":  "12312@gmail.com",
//                    "12312@gmail.com"
//                  }
//       5. send the HTTP request
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var cors = require("cors");

// Connects to routes
var indexRouter = require('./routes/index');
var homeRouter = require('./routes/home');

var compression = require('compression');
var helmet = require('helmet');
var app = express();

// DB and passport config
require('./config/passport')(passport);

// Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = 'mongodb+srv://yutao:brysjhhrhlyqqlmgsycl@bountyprogrammers.iu0xm.mongodb.net/BountyProgrammers?retryWrites=true&w=majority'
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

// Express session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
)

// Allow cross origin request
app.use(cors());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.use('/', indexRouter);
app.use('/home', homeRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
