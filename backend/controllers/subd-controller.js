const { validationResult } = require('express-validator');

const ApiError = require('../exceptions/api-error');
const subdModel = require('../models/subd-model');

class SubdController {
    async createSubd(req, res, next) {
        try {
            const newSubd = new subdModel({
                title: req.body.title,
                subd: req.protocol + '://' + req.host + ':3001/' + req.file?.path,
                creator: req.user,
                createdAt: new Date().toISOString()
            })
            await newSubd.save();
            res.status(201).json(newSubd);
        } catch (error) {
            next(error);
        }
    }

    async getSubds(req, res, next) {
        try {
            const subd = await subdModel.find();
            if (!subd.length) {
                return next(ApiError.NotFoundError('No posts found'));
            }
            res.status(200).json(subd);
        } catch (error) {
            next(error);
        }
    }

    async getSubd(req, res, next) {
        const { id } = req.params;
        try {
            const subd = await subdModel.findById(id);
            res.status(200).json(subd);
        } catch (error) {
            next(error);
        }
    }

    async deleteSubd(req, res, next) {
        const { id } = req.params;
        try {
            await subdModel.findByIdAndDelete(id);
            res.status(200).json({ message: 'Post deleted' });
        } catch (error) {
            next(error);
        }
    }

    async editSubd(req, res, next) {
        try {
            const updateSubd = await subdModel.findById(req.params.id);
            updateSubd.title = req.body.title;
            // updateSubd.subd = req.body.subd;
            const result = await updateSubd.save();
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new SubdController();