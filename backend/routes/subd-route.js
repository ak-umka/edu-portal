const Router = require('express');
const { body } = require('express-validator');
const multer = require('multer');

const authMiddleware = require('../middlewares/auth-middleware');
const SubdController = require('../controllers/subd-controller');
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

router.post('/createSubd', authMiddleware, upload.single('subd'),  SubdController.createSubd);
router.get('/getSubd/:id', SubdController.getSubd);
router.delete('/deleteSubd/:id', authMiddleware, SubdController.deleteSubd);
router.get('/getSubds', SubdController.getSubds);
router.put('/editSubd/:id', authMiddleware, SubdController.editSubd);

module.exports = router;