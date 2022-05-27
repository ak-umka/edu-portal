const userModel = require('../models/user-model');

const TokenService = require('../services/token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');

const bcrypt = require('bcrypt');

class AuthService {
    async signup (email, password, role) {
        const checkUser = await userModel.findOne({email: email});
        if (checkUser) {
            throw ApiError.BadRequestError('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 3);
        const user = await userModel.create({email, password: hashedPassword, role: role || 'basic'});
        
        const userDto = new UserDto(user);
        const tokens = TokenService.generateToken({...userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {user: userDto, ...tokens};
    }

    async signin (email, password) {
        const user = await userModel.findOne({email});
        if (!user) {
            throw ApiError.BadRequestError('User does not exist');
        }
        const IsPassEqual = await bcrypt.compare(password, user.password);
        if (!IsPassEqual) {
            throw ApiError.BadRequestError('Password is incorrect');
        }
        const userDto = new UserDto(user);
        const tokens = TokenService.generateToken({...userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}; 
    }

    async logout (refreshToken) {
        const token = await TokenService.removeToken(refreshToken);
        return token;
    }

    async refresh (refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError('Refresh token is required');
        }
        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = TokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError('Refresh token is invalid');
        }
        const user = await userModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = TokenService.generateToken({...userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto };
    }

    async getUsers () {
        const users = await userModel.find();
        return users;
    }
}

module.exports = new AuthService();