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
  console.log(req.body);

  // const addLikeData = req.body.like;
  saucesModel.findOne({ _id: req.params.id }).then((sauce) => {
    const like = req.body.like;
    if (like === 1) {
      sauce.usersLiked.push(req.body.userId);
    } else if (like === -1) {
      sauce.usersDisliked.push(req.body.userId);
      } else{
        if (sauce.userLiked.include(userId)){
          sauce.usersLiked.splice(userId);
        }
        else (sauce.userDisliked.include(userId)){
          sauce.usersDisliked.splice(userId);
    }
  }});
  // console.log(req.body);
  // const { userId } = req.body;
  // const sauceId = req.params.id;
  // const action = req.body.like;
  // sauceData.findById(sauceId, (err, sauce) => {
  //   if (err) return res.status(500).json({ error: "Error finding sauce" });
  //   if (!sauce) return res.status(404).json({ error: "Sauce not found" });
  //   let userRecord = sauce.usersLiked.find((r) => r.userId === userId);
  //   if (!userRecord) {
  //     userRecord = { userId, likes: 0, dislikes: 0 };
  //     sauce.usersLiked.push(userRecord);
  //   }
  //   const updateLikes = () => {
  //     if (userRecord.likes % 2 === 0) {
  //       userRecord.likes = 0;
  //       sauce.usersLiked = sauce.usersLiked.filter((r) => r.userId !== userId);
  //     } else {
  //       userRecord.likes = Math.min(userRecord.likes + 1, 2);
  //     }
  //     return userRecord.likes;
  //   };
  //   const updateDislikes = () => {
  //     if (userRecord.dislikes % 2 === 0) {
  //       userRecord.dislikes = 0;
  //       sauce.usersLiked = sauce.usersLiked.filter((r) => r.userId !== userId);
  //     } else {
  //       userRecord.dislikes = Math.max(userRecord.dislikes - 1, -1);
  //     }
  //     return userRecord.dislikes;
  //   };
  //   sauce.save((err) => {
  //     if (err) return res.status(500).json({ error: "Error saving sauce" });
  //     res.json({
  //       likes: action === 1 ? updateLikes() : userRecord.likes,
  //       dislikes: action === -1 ? updateDislikes() : userRecord.dislikes,
  //     });
  //   });
  // });
};
