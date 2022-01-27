const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    username: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 1024,
        max: 6
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    last_logged_in: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Users', UserSchema);