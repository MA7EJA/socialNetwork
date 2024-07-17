const express = require('express');
const connectToDb = require('./dataBase/db');
require('dotenv').config();

const cloudinary = require("./config/cloudinary");

const router = require('./routes/Routes')

const app = express()

app.use(express.json())

app.use('/api', router)

app.listen(process.env.PORT, () => {
        if (!process.env.PORT) {
          console.error("PORT variable is not set in .env file");
          process.exit(1);
        }
        console.log(`Server is Running on ${process.env.PORT} port`)
        connectToDb()
    }
);