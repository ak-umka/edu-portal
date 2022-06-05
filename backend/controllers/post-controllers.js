const { validationResult } = require("express-validator");

const ApiError = require("../exceptions/api-error");
const postModel = require("../models/post-model");
const commentPost = require("../models/comment-model");

class PostController {
  async createPost(req, res, next) {
    try {
      const newPost = new postModel({
        title: req.body.title,
        photo: req.protocol + "://" + req.host + ":3001/" + req.file?.path,
        content: req.body.content,
        creator: req.user,
        createdAt: new Date().toISOString(),
      });
      console.log(req.raw);
      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      next(error);
    }
  }

  async getPosts(req, res, next) {
    try {
      req.query.page = req.query.page || 1;
      // check if page is a number
      if (isNaN(req.query.page)) {
        return next(ApiError.BadRequestError("Page must be a number"));
      }
      // convert page to number
      req.query.page = Number(req.query.page);
      const post = await postModel
        .find()
        // .limit(12)
        // .skip(12 * req.query.page)
        .populate("comment");
      if (!post.length) {
        return next(ApiError.NotFoundError("No posts found"));
      }
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }

  async getPost(req, res, next) {
    const { id } = req.params;
    try {
      const post = await postModel.findById(id).populate("comment");
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }

  async deletePost(req, res, next) {
    const { id } = req.params;
    try {
      await postModel.findByIdAndDelete(id);
      res.status(200).json({ message: "Post deleted" });
    } catch (error) {
      next(error);
    }
  }

  async editPost(req, res, next) {
    try {
      const updateBlog = await postModel.findById(req.params.id);
      updateBlog.title = req.body.title;
      updateBlog.content = req.body.content;
      updateBlog.photo =
        req.protocol + "://" + req.host + ":3001/" + req.file?.path;
      const result = await updateBlog.save();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async commentPost(req, res, next) {
    // const { id } = req.params;
    try {
      const newComment = new commentPost({
        comment: req.body.comment,
        author: req.email,
      });
      await newComment.save();

      const post = await postModel.findById(req.params.id); //.lean().populate('comments')
      if (!post) {
        return next(ApiError.NotFoundError("No post found"));
      }
      post.comment.push(newComment);
      await post.save();
      res.status(201).json(newComment);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
