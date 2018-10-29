const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('./auth');
const Home = mongoose.model('Home');
const homeController = require('../controllers/homeController');
const { createHome, sendRequestToHome } = homeController;

router.post('/create', auth.required, (req, res, next) => {
    createHome(req, res);
});

router.post('/send/request/:email', auth.required, (req, res, next) => {
    sendRequestToHome(req, res)
})

module.exports = router;