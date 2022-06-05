const mongoose = require('mongoose');

const scheSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    schedule: {
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

module.exports = mongoose.model('Schedule', scheSchema);