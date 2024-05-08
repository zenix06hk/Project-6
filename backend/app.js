const express = require("express");
const app = express();
const cors = require("cors");

const saucesRoutes = require("./routes/sauces");
const authRoutes = require("./routes/auth.js");

//'*' Allow any origin

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-with, content-Type, Accept, Authorization"
//   );
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//   );
// });

// allow send the request

// app.use((req, res, next) => {
//   res.status(200).json({
//     message: "This is working",
//   });
// });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
