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
mongoose.connect('mongodb://localhost/reactdb');
mongoose.set('debug', true);

//Models &routes
var Users = require('./models/Users');
app.use(require('./routes'));

//passport
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy(
  function(username, password, done) {
    Users.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validatePassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      const token = user.generateJWT()
      console.log(token)
      Users.updateOne({username: username}, {$set: {token: token}})
      return done(null, {user, token: token});
    });
  }
));

//token


//crud

app.post('/login',
  passport.authenticate('local', {
    session: false
  }),
  function(req, res) {
    console.log(req.user.token)
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify({ token: req.user.token}));
  });

app.get('/login', (req, res) => {
  Users.findOne({ username: "MC" }, function (err, user) {
    console.log(user)
  })
  // var User = new Users();
  // User.username = "MC"
  // User.hash = crypto.pbkdf2Sync('asd', "adasdjajdahcz13213jdsa", 10000, 512, 'sha512').toString('hex')
  // User.token = ''
  // User.save()
  // console.log(User, "asd")
  res.sendFile(__dirname + '/index.html')
})
app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(1111, () => console.log('Server running on http://localhost:1111/'));