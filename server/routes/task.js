const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('./auth');
const Task = mongoose.model('Task');

router.get('/', auth.required, (req, res, next) => {
    const { payload: { userId }} = req
    Task.find({id: userId}, function (err, task) {
        res.json({task})
    })
})

module.exports = router;