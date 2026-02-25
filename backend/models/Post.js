const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    summary: {
        type: String,
        required: [true, 'Please add a summary'],
        trim: true
    },
    content: {
        type: String,
        required: [true, 'Please add content']
    },
    coverImage: {
        type: String,
        default: 'no-photo.jpg'
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', PostSchema);
