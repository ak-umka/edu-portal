const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const errorMiddleware = require('./middlewares/error-middleware');
const router = require('./routes/auth-route');
const postRouter = require('./routes/post-route');
const subdRouter = require('./routes/subd-route');
const scheduleRouter = require('./routes/schedule-route');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(cookieParser());


app.use(express.static('public'));
app.use('/images', express.static('images'));
app.use('/api/v0/', router, postRouter, subdRouter, scheduleRouter);
app.use(errorMiddleware);



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