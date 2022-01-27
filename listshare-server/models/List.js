const mongoose = require('mongoose');

const ListSchema = mongoose.Schema({
    created_by: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    last_editted: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Lists', ListSchema);