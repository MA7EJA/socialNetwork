const mongoose = require('mongoose');
require('dotenv').config();

const connectToDb = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Connected to database");
    } catch (err) {
      console.error("Connection error", err);
    }
}

module.exports = connectToDb;