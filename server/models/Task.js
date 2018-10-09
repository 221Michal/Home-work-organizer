const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    id: String,
    taskType: String,
    taskContent: Object,
    status: String,
})

TaskSchema.methods.taskAdd = function (id, taskType, taskContent) {
    this.id = id;
    this.taskType = taskType;
    this.taskContent = taskContent;
    this.status = 'WAITING';
}

TaskSchema.methods.taskDone = function () {
    this.status = 'DONE';
}

TaskSchema.methods.taskRejected = function () {
    this.status = 'REJECTED';
}

TaskSchema.methods.taskGetInfo = function () {
    const taskInfo = {
        taskContent: this.taskContent,
        status: this.status,
        id: this.id,
        taskType: this.taskType,
    }
    return taskInfo

}

module.exports = mongoose.model('Task', TaskSchema);


