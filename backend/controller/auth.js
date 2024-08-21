const userModel = require("../models/user");

//Password-hashing functio
const bcrypt = require("bcrypt");

//To securely transfer information over the web
const jwt = require("jsonwebtoken");
const saltRounds = 10;

//Controller for creating a user account
exports.signUp = (req, res) => {
  bcrypt
    .hash(req.body.password, saltRounds)
    .then((hash) => {
      const newUser = new userModel({
        email: req.body.email,
        password: hash,
      });
      newUser
        .save() //save the user to the database
        .then(() => {
          res.status(200).json({ error: new Error("User created.") });
        })
        .catch((error) => {
          res.status(500).json({ error: error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

//Controller for login user account
exports.login = (req, res) => {
  userModel
    .findOne({ email: req.body.email }) //compare the username email address
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: new error("User not found!"),
        });
      }
      bcrypt
        .compare(req.body.password, user.password) //Compare the password
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: new error("Incorrect password!"),
            });
          }

          //Creation of the authentication token
          const token = jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
            expiresIn: "24h",
          });
          res.status(200).json({
            userId: user._id,
            token: token,
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: error,
          });
        });
    })
    //Server error
    .catch((error) => {
      res.status(501).json({
        error: error,
      });
    });
};
