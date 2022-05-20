const mongoose = require('mongoose');

const subdSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subd: {
        type: String,
    },
    creator: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('Subd', subdSchema);