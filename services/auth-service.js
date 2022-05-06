const userModel = require('../models/user-model');
// const MailService = require('../services/mail-service');
const TokenService = require('../services/token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');

const bcrypt = require('bcrypt');
const uuid = require('uuid');


class AuthService {
    async signup (email, password) {
        const checkUser = await userModel.findOne({email: email});
        if (checkUser) {
            throw ApiError.BadRequestError('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 3);
        const user = await userModel.create({email, password: hashedPassword});
        

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
        return {...tokens, user: userDto };
    }

}

module.exports = new AuthService();