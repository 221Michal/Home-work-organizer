const mongoose = require('mongoose');
const Task = mongoose.model('Task');
const homeControler = require('./homeController')
const { addUserToHome, rejectRequest } = homeControler

const taskController= {};

taskController.fetchAllTask = function (userId, res) {
    const { payload: { userId } } = req
    Task.find({ id: userId, status: "WAITING" }, function (err, task) {
        res.json({ task })
    })
}

taskController.taskAccept = function (req, res) {
    Task.findOne({_id: req.params.taskId}, function (err, task) {
        task.status = 'DONE';
        task.save();
        addUserToHome(task.id, task.taskContent.homeId, res)
        rejectRestRequest(req)
    })
}

taskController.rejectRequest = function (req, res) {
    const { params: { taskId } } = req
    Task.findOne({ _id: taskId }, function (err, task) {
        rejectTask(task)
        res.json({message: 'odrzuciłeś zaproszenie do home'})
    })
}

const rejectRestRequest = function (req) {
    const { payload: {userId} } = req
    Task.find({ id: userId, status: "WAITING" }, function (err, tasks) {
       tasks.forEach(task => {
           rejectTask(task)
       })
    })
}

const rejectTask = function (task) {
    task.status= 'REJECTED';
    task.save()
}

module.exports = taskController;
