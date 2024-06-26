const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  //(equals mongoose.Schema)
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    hashed: true,
  },
});

// UserSchema.pre("save", function (next) {
//   if (this.password) {
//     var salt = bcrypt.genSaltSync(10);
//     this.password = bcrypt.hashSync(this.password, salt);
//   }
//   next();
// });

module.exports = mongoose.model("user", userSchema);
