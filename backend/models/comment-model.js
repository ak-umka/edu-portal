const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    comment: {
        type: String,
    },
    author: {
        type: String,
    }
})

module.exports = mongoose.model('Comment', Schema);