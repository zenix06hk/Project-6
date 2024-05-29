const userModel = require("../model/user");

exports.testSave = (req, res) => {
  const userData = new userModel({
    email: "Email Address",
    password: "Password",
  });

  userData
    .save()
    .then(() => {
      res.status(201).json({
        message: " This has saved",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: "it failed",
        message: error.message,
      });
    });
};

exports.signUp = (req, res) => {
  const newUser = new user({
    email: req.body.email,
    password: req.body.password,
  });

  res.send({
    message: " This is point to signup POST",
  });
};

exports.login = (req, res) => {
  ({
    email: req.body.email,
    password: req.body.password,
  });

  res.send({
    message: " This is point to login POST",
  });
};

// exports.login = (req, res) => {
//   res.status(200).json({
//     message: " This is point to login POST",
//   });
// };
