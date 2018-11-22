const mongoose = require('mongoose');
const User = mongoose.model('User');
const Home = mongoose.model('Home');
const Task = mongoose.model('Task');
const taskTypes = require('../utils/constans/TasksType')

const homeController = {};

homeController.createHome = function (req, res) {
    const { payload: { userId, username }, body: { homeName } } = req;
    const newHome = new Home();
    newHome.createHome(homeName, userId, username);
    const newHomeInfo = newHome.getHomeInfo()
    User.findOne({ _id: userId }, function (err, user) {
        user.joinHome(newHomeInfo.homeId, true)
        user.save()
    })
    return newHome.save()
        .then(() => res.json({ message: 'założenie nowego Home powiodło się' }))
}

homeController.sendRequestToHome = function (req, res) {
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
}

homeController.addUserToHome = function (userId, homeId, res) {
    User.findOne({_id: userId}, function (err, user) {
        user.joinHome(homeId, false)
        user.save();
       return res.json({message: "udało się dołączyć do grupy"})
    })
}

const sendRequest = function (homeId, user) {
    const { REQUEST_FOR_HOME } = taskTypes
    const request = new Task();
    request.taskAdd(user._id, REQUEST_FOR_HOME, { homeId })
    request.save();
}

homeController.homeInfo = function (req, res) {
 Home.findById(req.params.homeId)
 .then(home => {
    if (!home) {
        return res.sendStatus(400);
      }
      return res.json({ home: home.getHomeInfo() });
 })
}

module.exports = homeController;