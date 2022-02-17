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
    items: [{
        item_name: {
            type: String,
            required: true
        },
        https: {
            type: String,
            default: null
        },
        description: {
            type: String,
            default: null
        },
        item_author: {
            type: String,
            required: true
        },
        item_added: {
            type: Date,
            default: Date.now
        },
    },],
    list_created: {
        type: Date,
        default: Date.now
    },
    last_editted: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Lists', ListSchema);