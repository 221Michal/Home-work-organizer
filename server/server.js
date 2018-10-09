const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

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
app.use(express.static(path.join(__dirname, '../client/build')))

//Configure Mongoose
mongoose.connect('mongodb://localhost/mern');
mongoose.set('debug', true);

//passport
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
  app.use(passport.initialize());

passport.use(new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
 },
  function(email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (!user.validatePassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      const token = user.generateJWT()
      user.token = token
      return done(null, user);
    });
  }
));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

//Models & routes
var User = require('./models/User');
var Home = require('./models/Home');
var Task = require('./models/Task');
app.use('/api', require('./routes/api'));
// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname + '/dist/index.html'));
// });
app.get('*',function (req, res) {
  res.redirect('/');
});

app.listen(1111, () => console.log('Server running on http://localhost:1111/'));