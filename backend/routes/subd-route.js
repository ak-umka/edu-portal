const Router = require('express');
const { body } = require('express-validator');
const multer = require('multer');
const express = require('express');

const authMiddleware = require('../middlewares/auth-middleware');
const SubdController = require('../controllers/subd-controller');
const AccessControl = require('../controllers/access-controller');

const router = new Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/subd');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage }); 

router.post('/createSubd', express.json(),  authMiddleware, AccessControl.grantAccess('createAny', 'subd'), upload.single('subd'),  SubdController.createSubd);
router.get('/getSubd/:id', SubdController.getSubd);
router.delete('/deleteSubd/:id', authMiddleware, AccessControl.grantAccess('deleteAny', 'subd'), SubdController.deleteSubd);
router.get('/getSubds', SubdController.getSubds);
router.put('/editSubd/:id', authMiddleware,  AccessControl.grantAccess('updateAny', 'subd'), upload.single('subd'), SubdController.editSubd);

module.exports = router;