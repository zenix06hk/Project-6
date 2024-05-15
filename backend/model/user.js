const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  //(equals mongoose.Schema)
  email: String,
  password: String,
});

module.exports = mongoose.model("user", userSchema);
