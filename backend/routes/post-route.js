const Router = require('express');
const { body } = require('express-validator');
const multer = require('multer');
const express = require('express');

const authMiddleware = require('../middlewares/auth-middleware');
const PostController = require('../controllers/post-controllers');
const router = new Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage }); 

router.post('/createPost', authMiddleware, upload.single('photo'),  PostController.createPost);
router.get('/getPost/:id', express.json(),  PostController.getPost);
router.post('/getPost/:id/comment', authMiddleware,  upload.any(), PostController.commentPost);
router.delete('/deletePost/:id', authMiddleware, PostController.deletePost);
router.get('/getPosts', PostController.getPosts);
router.put('/editPost/:id', authMiddleware, upload.single('photo'),  PostController.editPost);


module.exports = router;