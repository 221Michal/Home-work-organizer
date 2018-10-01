const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('./auth');
const User = mongoose.model('User');

//POST new user route (optional, everyone has access)
router.post('/register', auth.optional, (req, res, next) => {
  const { body: { username, password, email } } = req;
  if (!email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }
  User.findOne({ email: email }, function (err, user) {
    if (user) {
      return res.status(422).json({
        errors: {
          message: 'zajęty mail',
        },
      });
    }
    else {
      const finalUser = new User();
      finalUser.setName(username);
      finalUser.setUserId();
      finalUser.setEmail(email);
      finalUser.setPassword(password);
      finalUser.generateJWT()

      return finalUser.save()
        .then(() => res.json({ user: finalUser.toAuthJSON() }));
    }
  })
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.status(401).json(info); }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      return res.json({ token: req.user.token });
    });
  })(req, res, next);
});

//GET current route (required, only authenticated users have access) 5bae11a54df1243b79273121
router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;
  console.log(req.payload)
  return User.findById(id)
    .then((user) => {
      if (!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = router;