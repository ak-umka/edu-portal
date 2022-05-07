const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model');


class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
        return { accessToken, refreshToken };
    }


    validateAccessToken(accessToken) {
        try {
            const userData = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            return userData;
        } catch (error) {
            return null;
        }
    }

    validateRefreshToken(accessToken) {
        try {
            const userData = jwt.verify(accessToken, process.env.REFRESH_TOKEN_SECRET);
            return userData;
        } catch (error) {
            return null;
        }
    }


    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({ user: userId });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            await tokenData.save();
        }
        const token = await tokenModel.create({ user: userId, refreshToken });
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await tokenModel.deleteOne({ refreshToken });
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await tokenModel.findOne({ refreshToken });
        return tokenData;
    }
}

module.exports = new TokenService();