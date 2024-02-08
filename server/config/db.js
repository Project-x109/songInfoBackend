require('dotenv').config();
const mongoose = require("mongoose");

const connectDatabase = async () => {
  const mongoDB = "mongodb+srv://amanuelgirma108:gondar2022@cluster0.m4o6co3.mongodb.net/?retryWrites=true&w=majority";
  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on("connected", () => {
      console.log("Database is connected Successfully");
    });

    return db;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
};

module.exports = connectDatabase;
