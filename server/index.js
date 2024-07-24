const express = require('express');
const connectToDb = require('./dataBase/db');
const cookieParser = require("cookie-parser");
const { app, server } = require('./socket/socket')
require('dotenv').config();

const cloudinary = require("./config/cloudinary");

const router = require('./routes/Routes')

app.use(express.json())
app.use(cookieParser());

app.use('/api', router)

server.listen(process.env.PORT, () => {
        if (!process.env.PORT) {
          console.error("PORT variable is not set in .env file");
          process.exit(1);
        }
        console.log(`Server is Running on ${process.env.PORT} port`)
        connectToDb()
    }
);