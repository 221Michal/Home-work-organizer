const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('./auth');
const Home = mongoose.model('Home');
const User = mongoose.model('User');
const Task = mongoose.model('Task');
const taskTypes = require('../utils/constans/TasksType')

router.post('/create', auth.required, (req, res, next) => {
    const { payload: { userId, username }, body: { homeName } } = req;
    const newHome = new Home();
    newHome.createHome(homeName, userId, username);
    const newHomeInfo = newHome.getHomeInfo()
    User.findOne({ _id: userId }, function (err, user) {
        user.joinHome(newHomeInfo.homeId)
        user.save()
    })
    return newHome.save()
        .then(() => res.json({ message: 'założenie nowego Home powiodło się' }))
});



router.post('/send/request/:email', auth.required, (req, res, next) => {
    const { body: { homeId } } = req;
    User.findOne({ email: req.params.email }, function (err, user) {
        if (user) {
            if (!user.homeId, "id") {
                sendRequest(homeId, user)
                res.json({ message: 'Wysłałeś zaproszenie do swojego home' })
            }
            else res.status(422).json({ message: 'użytkownik jest już przypisany do jakiegoś Home' })
        }
    })
})

const sendRequest = function (homeId, user) {
    const { REQUEST_FOR_HOME } = taskTypes
    const request = new Task();
    request.taskAdd(user._id, REQUEST_FOR_HOME, { homeId })
    request.save();
}

module.exports = router;