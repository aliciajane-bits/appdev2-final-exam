const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("../routes/authRoutes"); 
const eventRoutes = require("../routes/eventRoutes");
require("dotenv").config();


app.use('/api/events', require('../routes/events'));

app.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
});

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;


mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected!");
  })
  .catch((error) => {
    console.log(error.message);
  });