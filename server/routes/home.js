const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('./auth');
const Home = mongoose.model('Home');

router.post('/create', auth.required, (req, res, next) => {
    const { payload: { userId, username }, body: { homeName } } = req;

    const newHome = new Home();
    newHome.createHome(homeName, userId, username);
    const newHomeInfo= newHome.getHomeInfo()
    //dodać do usera HomeId

    return newHome.save()
    .then(() => res.json({message: 'założenie nowego "Home" powiodło się'}))
  });

  module.exports = router;