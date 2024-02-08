// errorHandler.js
const express = require("express");
const MyCustomErrorType = require('./myCustomErrorType');
function errorHandler(err, req, res, next) {
  const error = []
  if (err instanceof MyCustomErrorType) {
    return res.status(400).json({ error: err.message });
  } else if (err.name === "ValidationError") {
    error.push(err.message);
    return res.status(400).json({ success: false, error: error });
  }
  error.push("Internal Server Error")
  res.status(500).json({ success: false, error: error });
}

module.exports = errorHandler;
