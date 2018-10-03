const express = require('express');
const router = express.Router();

router.use('/user', require('./user'));
router.use('/home', require('./home'));

module.exports = router;