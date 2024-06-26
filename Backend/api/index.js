require('dotenv').config({ path: '../.env' });
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const graphRoutes = require("../routes/graph");

const MONGODB_URI = process.env.MONGODB_URI;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/graph", graphRoutes);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(3000);
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
