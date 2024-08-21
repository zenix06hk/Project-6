const mongoose = require("mongoose");

//Provides pre-save validation for Mongoose schema unique fields.
const uniqueValidator = require("mongoose-unique-validator");

//Setting up the user schema
const userSchema = mongoose.Schema({
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

//Creating the model
userSchema.plugin(uniqueValidator);

// Export and exploitation of the model
module.exports = mongoose.model("user", userSchema);
