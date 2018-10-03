const mongoose = require('mongoose');
const { Schema } = mongoose;

const HomeShema = new Schema({
    homeName: String,
    users: Array,
})

HomeShema.methods.createHome = function(homeName, userId, username) {
    this.homeName = homeName;
    this.users = [
        {
            leader: true,
            homeName,
            userId,
            username,
        }
    ]
};
HomeShema.methods.getHomeInfo = function() {
    return {
        homeName: this.homeName,
        homeId: this._id,
        users: this.users
    }
}

module.exports = mongoose.model('Home', HomeShema);