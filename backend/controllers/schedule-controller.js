const ApiError = require("../exceptions/api-error");
const scheModel = require("../models/schedule-model");

class ScheduleController {
    async createSchedule(req, res, next) {
      try {
        const newSchedule = new scheModel({
          title: req.body.title,
          schedule: req.protocol + "://" + req.host + ":3001/" + req.file?.path,
          creator: req.user,
          createdAt: new Date().toISOString(),
        });
        await newSchedule.save();
        res.status(201).json(newSchedule);
      } catch (error) {
        next(error);
      }
    }
  
    async getSchedules(req, res, next) {
      try {
        req.query.page = req.query.page || 1;
        // check if page is a number
        if (isNaN(req.query.page)) {
          return next(ApiError.BadRequestError("Page must be a number"));
        }
        // convert page to number
        req.query.page = Number(req.query.page);
  
        const schedule = await scheModel
          .find()
          .limit(12)
          .skip(12 * req.query.page);
        if (!schedule.length) {
          return next(ApiError.NotFoundError("No posts found"));
        }
        res.status(200).json(schedule);
      } catch (error) {
        next(error);
      }
    }
  
    async getSchedule(req, res, next) {
      const { id } = req.params;
      try {
        const schedule = await scheModel.findById(id);
        res.status(200).json(schedule);
      } catch (error) {
        next(error);
      }
    }
  
    async deleteSchedule(req, res, next) {
      const { id } = req.params;
      try {
        await scheModel.findByIdAndDelete(id);
        const schedule = await scheModel.findById(id);
        res.status(200).json({ message: "Post deleted", schedule });
      } catch (error) {
        next(error);
      }
    }
  
    async editSchedule(req, res, next) {
      try {
        const updateSchedule= await scheModel.findById(req.params.id);
        updateSchedule.title = req.body.title;
        updateSchedule.subd =
          req.protocol + "://" + req.host + ":3001/" + req.file?.path;
        const result = await updateSchedule.save();
        res.status(200).json(result);
      } catch (error) {
        next(error);
      }
    }
  }
  
  module.exports = new ScheduleController();
  