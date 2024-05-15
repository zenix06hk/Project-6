const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  //(equals mongoose.Schema)
  email: [
    {
      type: String,
      unique: true,
    },
  ],
  password: [
    {
      type: String,
      hashed: true,
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
