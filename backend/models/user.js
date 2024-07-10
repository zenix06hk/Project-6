const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  //(equals mongoose.Schema)
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    hashed: true,
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("user", userSchema);
