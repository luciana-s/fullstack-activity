const express = require("express");
const app = express();
const mongoose = require("mongoose");

// * connect to Mongo DB
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.xfykdza.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });


// very important
module.exports = app;
