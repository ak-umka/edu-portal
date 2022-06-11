const AuthService = require('../services/auth-service');
const {validationResult} = require('express-validator');

const ApiError = require('../exceptions/api-error');

class AuthController {
    async signup (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequestError(errors.array(), 'Validation failed'));
            }
            const { email, password, role, firstname, lastname } = req.body;
            const userData = await AuthService.signup(email, password, role, firstname, lastname);
            res.cookie ('refreshToken', userData.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
            return res.status(201).json(userData);
        } catch (error) {
            next(error);
        }
    }

    async signin (req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await AuthService.signin(email, password);
            res.cookie ('refreshToken', userData.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async logout (req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await AuthService.logout(refreshToken);
            res.clearCookie ('refreshToken');
            return res.json(token);

        } catch (error) {
            next(error);
        }
    }

    async refresh (req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await AuthService.refresh(refreshToken);
            res.cookie ('refreshToken', userData.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async getUsers (req, res, next) {
        try {
            const users = await AuthService.getUsers();
            return res.json(users);
        } catch (error) {
            next(error);
        }
    }
    
}

module.exports = new AuthController();