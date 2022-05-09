const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    photo: {
        type: String,
    },
    creator: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]

});

module.exports = mongoose.model('Post', postSchema);