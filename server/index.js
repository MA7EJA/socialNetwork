const express = require('express');
require('dotenv').config();

const app = express()

app.listen(process.env.PORT, () => {
        if (!process.env.PORT) {
          console.error("PORT variable is not set in .env file");
          process.exit(1);
        }
        console.log(`Server is Running on ${process.env.PORT} port`)
    }
);