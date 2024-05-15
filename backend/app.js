const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const saucesRoutes = require("./routes/sauces");
const authRoutes = require("./routes/auth.js");

app.use(cors());

mongoose
  .connect(
    "mongodb+srv://alvin06hk:Ve4arWp50SWMlcB7@database-z.p8xkqwp.mongodb.net/"
  )
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });

//'*' Allow any origin

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// allow send the request

app.use("/", (req, res) => {
  res.send("Hello testing");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
