const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const jwt = require('jsonwebtoken');

const errorMiddleware = require('./middlewares/error-middleware');
const router = require('./routes/auth-route');
const postRouter = require('./routes/post-route');
const subdRouter = require('./routes/subd-route');

const User = require('./models/user-model');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/images', express.static('images'));
app.use('/api/v0/', router, postRouter, subdRouter);
app.use(errorMiddleware);


app.use(async (req, res, next) => {
    if (req.headers["x-access-token"]) {
        const accessToken = req.headers["x-access-token"];
        const { userId, exp } = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        // Check if token has expired
        if (exp < Date.now().valueOf() / 1000) {
            return res.status(401).json({
                error: "JWT token has expired, please login to obtain a new one"
            });
        }
        res.locals.loggedInUser = await User.findById(userId);
        next();
    } else {
        next();
    }
});

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => { console.log('Connected to DB') });
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();