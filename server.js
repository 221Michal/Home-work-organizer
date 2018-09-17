const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

//Initiate our app
const app = express();

//Configure our app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));


//Configure Mongoose
mongoose.connect('mongodb://localhost/mern');
mongoose.set('debug', true);

//Models &routes
var User = require('./models/User');
app.use('/user', require('./routes/user'));

//passport
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validatePassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      const token = user.generateJWT()
      user.token = token
      user.save((err) => {
        if (err) done(err, user);

        return done(null, user);
      })
      return done(null, user );
    });
  }
));

//token


//crud


// app.post('/login',
//   passport.authenticate('local', {
//     session: false
//   }),
//   function(req, res) {
//     console.log(res.user)
//     res.setHeader('Content-Type', 'application/json')
//     res.send(JSON.stringify({ token: req.user.token}));
//   });

// app.get('/login', (req, res) => {
//   User.findOne({ username: "MD" }, function (err, user) {
//   })
//   res.sendFile(__dirname + '/index.html')
// })
// app.get('/', (req, res) => {
//   res.send('Hello World')
// })

app.listen(1111, () => console.log('Server running on http://localhost:1111/'));