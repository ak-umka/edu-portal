const Router = require('express');
const { body } = require('express-validator');

const authMiddleware = require('../middlewares/auth-middleware');
const PostController = require('../controllers/post-controllers');
const router = new Router();

router.post('/createPost', authMiddleware,  PostController.createPost);
router.get('/getPost/:id', PostController.getPost);
router.get('/deletePost/:id', PostController.deletePost);
router.get('/getPosts', PostController.getPosts);


module.exports = router;