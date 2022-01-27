const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    list_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hyperlink: {
        type: String,
        default: null
    },
    notes: {
        type: String,
        default: null
    },
    added_by: {
        type: String,
        required: true
    },
    date_added: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Items', ItemSchema);