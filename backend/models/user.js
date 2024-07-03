const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

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

// UserSchema.pre("save", function (next) {
//   if (this.password) {
//     var salt = bcrypt.genSaltSync(10);
//     this.password = bcrypt.hashSync(this.password, salt);
//   }
//   next();
// });

module.exports = mongoose.model("user", userSchema);
