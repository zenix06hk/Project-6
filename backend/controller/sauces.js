const saucesModel = require("../models/sauces");
const fs = require("fs");

exports.saucesList = (req, res, next) => {
  saucesModel
    .find()
    .then((sauces) => {
      const mappedProducts = sauces.map((sauce) => {
        // console.log(sauce);
        return {
          ...sauce._doc,
          imageUrl:
            req.protocol +
            "://" +
            req.get("host") +
            "/images/" +
            sauce.imageUrl,
        };
      });
      // console.log("/////////////////////////////////////");
      // console.log(mappedProducts);
      res.status(200).json(mappedProducts);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.saucesSave = (req, res, next) => {
  console.log(req.body);
  const sauceDataForm = JSON.parse(req.body.sauce);
  console.log(sauceDataForm);
  const sauces = new saucesModel({
    userId: sauceDataForm.userId,
    name: sauceDataForm.name,
    manufacturer: sauceDataForm.manufacturer,
    description: sauceDataForm.description,
    mainPepper: sauceDataForm.mainPepper,
    imageUrl: req.file.filename,
    heat: sauceDataForm.heat,
    likes: 0,
    dislikes: 0,
  });

  sauces
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post saved successfully",
      });
    })

    .catch((error) => {
      // console.log(error);
      res.status(400).json({
        error: error,
      });
    });
};

exports.saucesListId = (req, res, next) => {
  const sauceId = req.params.id;
  saucesModel
    .findOne({ _id: sauceId })
    .then((sauce) => {
      res.status(200).json({
        ...sauce._doc,
        imageUrl:
          req.protocol + "://" + req.get("host") + "/images/" + sauce.imageUrl,
      });
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
  //   .catch((error) => {
  //     res.status(404).json({
  //       error: "here's the error",
  //     });
  //   });
};

exports.saucesListUpdate = (req, res, next) => {
  // console.log(req.body);
  let sauce = new saucesModel({ _id: req.params._id });
  console.log(sauce._id);
  if (!sauce?._id) {
    return res.status(401).json({
      error: new Error("Sauce not found!"),
    });
  }
  const sauceDataForm = req.body;
  console.log(sauceDataForm.userId);

  if (req.file) {
    sauce = {
      _id: req.params.id,
      userId: sauceDataForm.sauce.userId,
      name: sauceDataForm.sauce.name,
      manufacturer: sauceDataForm.sauce.manufacturer,
      description: sauceDataForm.sauce.description,
      mainPepper: sauceDataForm.sauce.mainPepper,
      imageUrl: req.file.filename,
      heat: sauceDataForm.sauce.heat,
    };
  } else {
    sauce = {
      _id: req.params.id,
      userId: sauceDataForm.userId,
      name: sauceDataForm.name,
      manufacturer: sauceDataForm.manufacturer,
      description: sauceDataForm.description,
      mainPepper: sauceDataForm.mainPepper,
      heat: sauceDataForm.heat,
    };
  }
  saucesModel
    .updateOne({ _id: req.params.id }, sauce)
    .then(() => {
      res.status(201).json({
        message: "sauce update successfully",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
exports.saucesDelete = (req, res, next) => {
  const test = req.body;
  console.log(test);
  saucesModel.findOne({ _id: req.params.id }).then((sauce) => {
    const filename = sauce.imageUrl.split("/images")[1];
    fs.unlink("images/" + filename, () => {
      saucesModel
        .deleteOne({ _id: req.params.id })
        .then(() => {
          res.status(201).json({
            message: "item deleted !",
          });
        })
        .catch((error) => {
          res.status(400).json({
            error: error,
          });
        });
    });
  });
  saucesModel.findOne({ _id: req.params.id }).then((sauce) => {
    if (!sauce) {
      return res.status(404).json({
        error: new Error("No such thing!"),
      });
    }
    if (sauce.userId !== req.auth.userId) {
      return res.json(404).json({
        error: new Error("No such thing!"),
      });
    }
  });
};
exports.saucesListLike = (req, res) => {
  // console.log(req.body);

  saucesModel
    .findOne({ _id: req.params.id })
    .then((sauce) => {
      const like = req.body.like;
      const userId = req.body.userId;
      // console.log(req.body);
      // console.log(like);
      // console.log(userId);
      // console.log(sauce);
      // console.log(sauce.usersLiked);
      if (like === 1) {
        if (sauce.usersLiked.includes(userId)) {
          sauce.usersLiked = sauce.usersLiked.filter((item) => item !== userId);
        } else {
          sauce.usersLiked.push(userId);
          sauce.likes++;
          // console.log(sauce.usersLiked);
        }
        if (sauce.usersDisliked.includes(userId)) {
          sauce.usersDisliked = sauce.usersDisliked.filter(
            (item) => item !== userId
          );
          sauce.dislikes--;
          // console.log(sauce.usersDisliked);
        }
      } else if (like === -1) {
        if (sauce.usersDisliked.includes(userId)) {
          // console.log(sauce.usersDisliked);

          sauce.usersDisliked = sauce.usersDisliked.filter(
            (item) => item !== userId
          );
        } else {
          sauce.usersDisliked.push(userId);
          sauce.dislikes++;
          // console.log(sauce.usersLiked);
        }
        if (sauce.usersLiked.includes(userId)) {
          sauce.usersLiked = sauce.usersLiked.filter((item) => item !== userId);
          sauce.likes--;
          // console.log(sauce.usersDisliked);
        }
      } else if (like === 0) {
        if (sauce.usersLiked.includes(userId)) {
          sauce.usersLiked = sauce.usersLiked.filter((item) => item !== userId);
          sauce.likes--;
        }
        if (sauce.usersDisliked.includes(userId)) {
          // console.log(sauce.usersDisliked);

          sauce.usersDisliked = sauce.usersDisliked.filter(
            (item) => item !== userId
          );
          sauce.dislikes--;
        }
      }
      saucesModel
        .updateOne({ _id: req.params.id }, sauce)
        .then(() => {
          res.status(201).json({
            message: "Like/dislike update successfully",
          });
        })
        .catch((error) => {
          res.status(400).json({
            error: error,
          });
        });
      // console.log(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};
