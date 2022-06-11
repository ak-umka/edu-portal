const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded?.id;
        req.role = decoded?.role;
        req.email = decoded?.email;
        req.firstname = decoded?.firstname;
        req.lastname = decoded?.lastname;
        // req.user.role = decoded?.role;
        // console.log (decoded)
        
        
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = auth;