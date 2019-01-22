const router = require('express').Router();
const auth = require('./auth');
const userControler = require('../controllers/userController')
const { register, login, getUserInfo } = userControler;

//POST new user route (optional, everyone has access)
router.post('/register', auth.optional, (req, res, next) => {
  register(req, res)
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  login(req, res, next)
});

//GET current route (required, only authenticated users have access) 5bae11a54df1243b79273121
router.get('/current', auth.required, (req, res, next) => {
  console.log("asd", Date())
  getUserInfo(req, res)
});

module.exports = router;