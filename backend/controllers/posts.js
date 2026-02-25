const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username').sort('-createdAt');
        res.status(200).json({ success: true, count: posts.length, data: posts });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'username');
        if (!post) {
            return res.status(404).json({ success: false, error: 'Post not found' });
        }
        res.status(200).json({ success: true, data: post });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.createPost = async (req, res) => {
    try {
        req.body.author = req.user.id; // User id from token
        const post = await Post.create(req.body);
        res.status(201).json({ success: true, data: post });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.updatePost = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ success: false, error: 'Post not found' });
        }

        // Make sure user is post owner
        if (post.author.toString() !== req.user.id) {
            return res.status(401).json({ success: false, error: 'User not authorized to update this post' });
        }

        post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: post });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ success: false, error: 'Post not found' });
        }

        if (post.author.toString() !== req.user.id) {
            return res.status(401).json({ success: false, error: 'User not authorized to delete this post' });
        }

        await post.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
