const Router = require('express');
const { body } = require('express-validator');
const AuthController = require('../controllers/auth-controllers');
const router = new Router();
const express = require('express');


router.post('/signup', express.json(), 
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    AuthController.signup
);

router.post('/signin', express.json(), AuthController.signin);
router.post('/logout', express.json(), AuthController.logout);
// router.get('/activate/:link', AuthController.activate);
router.get('/refresh', AuthController.refresh);
router.get('/users', AuthController.getUsers);

module.exports = router;