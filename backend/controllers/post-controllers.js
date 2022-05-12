const {validationResult} = require('express-validator');

const ApiError = require('../exceptions/api-error');
const postModel = require('../models/post-model');
const commentPost = require('../models/comment-model');

class PostController {
    async createPost (req, res, next) {
        try {
            const newPost = new postModel ({
                title: req.body.title,
                photo: req.file.path,
                content: req.body.content,
                creator: req.user,
                createdAt: new Date().toISOString()
            })
            await newPost.save();
            res.status(201).json(newPost);

        } catch (error) {
            next(error);
        }
    }

    async getPosts (req, res, next) {
        try {
            const post = await postModel.find();
            if (!post.length) {
                return next(ApiError.NotFoundError('No posts found'));
            }
            res.status(200).json(post); 
        } catch (error) {
            next(error);
        }
    }

    async getPost (req, res, next) {
        const { id } = req.params;
        try {
            const post = await postModel.findById(id);
            res.status(200).json(post); 
        } catch (error) {
            next(error);
        }
    }

    async deletePost (req, res, next) {
        const { id } = req.params;
        try {
            await postModel.findByIdAndDelete(id);
            res.status(200).json({message: 'Post deleted'});
        } catch (error) {
            next(error);
        }
    }

    async editPost (req, res, next) {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }

    async commentPost (req, res, next) {
        // const { id } = req.params;
        try {
            const comment = new commentPost ({
                comment: req.body.comment,
                author: req.user,
                createdAt: new Date().toISOString()
            });
            await comment.save();
            res.status(201).json(comment);
            const post = await postModel.findById(req.params.id);
            if (!post) {
                return next(ApiError.NotFoundError('No post found'));
            }
            // console.log(post);
            // console.log(post.comment)
            post.comment.push(comment);
            await post.save();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new PostController();