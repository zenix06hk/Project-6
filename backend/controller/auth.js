const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
// exports.testSave = (req, res) => {
//   const userData = new userModel({
//     email: req.body.email,
//     password: req.body.password,
//   });

//   userData
//     .save()
//     .then(() => {
//       res.status(201).json({
//         message: " This has saved",
//       });
//     })
//     .catch((error) => {
//       res.status(500).json({
//         error: "it failed",
//         message: error.message,
//       });
//     });
// };

exports.signUp = (req, res) => {
  bcrypt
    .hash(req.body.password, saltRounds)
    .then((hash) => {
      // console.log(req.body.password);
      // console.log("hash", hash);
      const newUser = new userModel({
        email: req.body.email,
        password: hash,
      });

      newUser
        .save()
        .then(() => {
          res.status(200).json({ message: "Password encrypt" });
        })
        .catch((error) => {
          res.status(500).json({ message: "Password failed encrypt" });
        });
    })
    .catch((error) => {
      console.log(error.message);
    });
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: new Error("User not found!"),
        });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: new Error("Incorrect password!"),
            });
          }
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
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

// exports.login = (req, res) => {
//   res.status(200).json({
//     message: " This is point to login POST",
//   });
// };
