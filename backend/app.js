const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const saucesRoutes = require("./routes/sauces");
const authRoutes = require("./routes/auth.js");

app.use(cors());

//mongodb+srv://alvin06hk:<password>@database-z.p8xkqwp.mongodb.net/?retryWrites=true&w=majority&appName=database-z

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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
