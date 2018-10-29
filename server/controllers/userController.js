const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const userControler = {};

userControler.register = function (req, res) {
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
            finalUser.setEmail(email);
            finalUser.setPassword(password);
            finalUser.generateJWT()
            return finalUser.save()
                .then(() => res.json({ user: finalUser.toAuthJSON() }));
        }
    })
}

userControler.login = function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.status(401).json(info); }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            return res.json({ token: req.user.token });
        });
    })(req, res, next);
}

userControler.getUserInfo = function (req, res) {
    const { payload: { userId } } = req;
    User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
}

module.exports = userControler;