const saucesModel = require("../models/sauces");

//Importing the file system package
const fs = require("fs");

//Diplay the sauce List menu on main page - controller GET
exports.saucesList = (req, res, next) => {
  saucesModel
    .find()
    .then((sauces) => {
      const mappedProducts = sauces.map((sauce) => {
        return {
          ...sauce._doc,
          //To generate the URL of the image of the created object
          imageUrl:
            req.protocol +
            "://" +
            req.get("host") +
            "/images/" +
            sauce.imageUrl,
        };
      });
      res.status(200).json(mappedProducts);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

//Upload the sauce first time - controller POST
exports.saucesSave = (req, res, next) => {
  const sauceDataForm = JSON.parse(req.body.sauce);
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
      res.status(400).json({
        error: error,
      });
    });
};

//Get the single sauce - controller GET
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
};

//Update the sauce info - controller PUT
exports.saucesListUpdate = (req, res, next) => {
  let sauce = new saucesModel({ _id: req.params._id });
  if (!sauce?._id) {
    return res.status(401).json({
      error: new Error("Sauce not found!"),
    });
  }
  const sauceDataForm = req.body;
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

// Delete sauce - Controller DELETE
exports.saucesDelete = (req, res, next) => {
  const test = req.body;
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

// Like the sauce - Controller POST
exports.saucesListLike = (req, res) => {
  saucesModel
    .findOne({ _id: req.params.id })
    .then((sauce) => {
      const like = req.body.like;
      const userId = req.body.userId;
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
