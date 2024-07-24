const express = require('express');
const connectToDb = require('./dataBase/db');
const cookieParser = require("cookie-parser");
const { app, server } = require('./socket/socket')
const path = require('path')
require('dotenv').config();

const cloudinary = require("./config/cloudinary");

const router = require('./routes/Routes')

app.use(express.json())
app.use(cookieParser());

app.use('/api', router)

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.json(__dirname, "../client/dist/index.html"));
});

server.listen(process.env.PORT, () => {
        if (!process.env.PORT) {
          console.error("PORT variable is not set in .env file");
          process.exit(1);
        }
        console.log(`Server is Running on ${process.env.PORT} port`)
        connectToDb()
    }
);