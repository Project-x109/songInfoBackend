require('dotenv').config();
const express = require("express");
const cors = require("cors"); // Import the cors middleware
const app = express();
const errorHandler = require("./middlewares/errorhandling.js");
const { logMiddleware } = require("./middlewares/logMiddleware.js");
const songs = require("./routes/songsRoute");
const allowedOrigin = 'https://songlistbackend.onrender.com';
const corsOptions = {
    origin: allowedOrigin,
    origin: true,
    credentials: true
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(logMiddleware);
app.use("/songs", songs);
app.use(errorHandler);
module.exports = app;
