const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


const start = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true}, () => { console.log('Connected to DB')});
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();