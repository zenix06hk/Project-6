const saucesModel = require("../models/sauces");

exports.saucesList = (req, res) => {
  saucesModel
    .find()
    .then((thing) => {
      res.status(200).json(thing);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.saucesListSave = (req, res) => {
  const sauce = new sauce({
    userId: req.body.userId,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    mainPepper: req.body.mainPepper,
    imageUrl: req.body.imageUrl,
    heat: req.body.hea,
    likes: req.body.like,
    dislikes: req.body.dislikes,
    userLiked: [
      {
        userId: req.body.userId,
      },
    ],
    userDisliked: [
      {
        userId: req.body.userId,
      },
    ],
  });
  sauce
    .save()
    .then(() => {
      res.stauts(201).json({
        message: "Post saved successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

exports.saucesListId = (req, res) => {
  const id = req.params.id;
  if (id === "new") {
    res.status(200).json({
      message: "this is a new item",
    });
  } else {
    res.status(200).json({
      message: " this is not a new item",
    });
  }
};

exports.saucesListUpdate = (req, res) => {
  res.status(200).json({
    message: " This is point to sauce List update",
  });
};
exports.saucesListDelete = (req, res) => {
  saucesModel.findOne({ _id: req.params.id }).then((sauce) => {
    const filename = sauce.imageUrl.split("/images")[1];
    fs.unlink("images/" + filename, () => {
      saucesModel
        .deleteOne({
          _id: req.params.id,
        })
        .then(() => {
          res.status(200).json({ message: "deleted!" });
        })
        .catch((error) => {
          res.status(404).json({
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
  res.status(200).json({
    message: " This is point to sauce List like item",
  });
};
