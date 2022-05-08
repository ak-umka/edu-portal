const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded?.id;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = auth;