const router = require('express').Router();
const auth = require('./auth');
const taskController = require('../controllers/taskController')
const { fetchAllTask, rejectRequest, taskAccept } = taskController

router.get('/', auth.required, (req, res, next) => {
    fetchAllTask(req, res)
})

router.put('/:taskId/accept', auth.required, (req, res, next) => {
    taskAccept(req, res)
})
router.put('/:taskId/reject', auth.required, (req, res, next) => {
    rejectRequest(req, res)
})

module.exports = router;