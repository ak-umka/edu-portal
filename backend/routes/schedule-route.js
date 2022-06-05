const Router = require('express');
const { body } = require('express-validator');
const multer = require('multer');
const express = require('express');

const authMiddleware = require('../middlewares/auth-middleware');
const ScheduleController = require('../controllers/schedule-controller');
const AccessControl = require('../controllers/access-controller');

const router = new Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/schedule');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage }); 

router.post('/createSchedule', express.json(),  authMiddleware, AccessControl.grantAccess('createAny', 'schedule'), upload.single('schedule'),  ScheduleController.createSchedule);
router.get('/getSchedule/:id', ScheduleController.getSchedule);
router.delete('/deleteSchedule/:id', authMiddleware, AccessControl.grantAccess('deleteAny', 'schedule'), ScheduleController.deleteSchedule);
router.get('/getSchedules', ScheduleController.getSchedules);
router.put('/editSchedule/:id', authMiddleware,  AccessControl.grantAccess('updateAny', 'schedule'), upload.single('schedule'), ScheduleController.editSchedule);

module.exports = router;