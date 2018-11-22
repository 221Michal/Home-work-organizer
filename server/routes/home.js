const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('./auth');
const homeController = require('../controllers/homeController');
const { createHome, sendRequestToHome, homeInfo } = homeController;

router.post('/create', auth.required, (req, res, next) => {
    createHome(req, res);
});

router.post('/send/request/:email', auth.required, (req, res, next) => {
    sendRequestToHome(req, res)
})

router.get('/:homeId', auth.required, (req, res, next) => {
    homeInfo(req, res)
})

module.exports = router;