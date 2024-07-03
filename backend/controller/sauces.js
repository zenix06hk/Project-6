const saucesModel = require("../models/sauces");

exports.saucesList = (req, res, next) => {
  SaucesData.find()
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
// exports.saucesListSave = (req, res) => {
//   const sauce = new sauce({
//     userId: req.body.userId,
//     name: req.body.name,
//     manufacturer: req.body.manufacturer,
//     description: req.body.description,
//     mainPepper: req.body.mainPepper,
//     imageUrl: req.body.imageUrl,
//     heat: req.body.hea,
//     likes: req.body.like,
//     dislikes: req.body.dislikes,
//     userLiked: [
//       {
//         userId: req.body.userId,
//       },
//     ],
//     userDisliked: [
//       {
//         userId: req.body.userId,
//       },
//     ],
//   });
//   sauce
//     .save()
//     .then(() => {
//       res.stauts(201).json({
//         message: "Post saved successfully",
//       });
//     })
//     .catch((error) => {
//       res.status(500).json({
//         error: error,
//       });
//     });
// };

exports.saucesSave = (req, res, next) => {
  const sauces = new SaucesData({
    userId: req.body.userId,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    mainPepper: req.body.mainPepper,
    imageUrl: req.body.imageUrl,
    heat: req.body.heat,
    likes: req.body.heat,
    dislikes: req.body.dislikes,
    userLiked: req.body.userLiked,
    userDisliked: req.body.userDisliked,
  });
  sauces
    .save()
    .then((req, res, next) => {
      res.json({
        message: "Post saved successfully",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.saucesListId = (req, res, next) => {
  SaucesData.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.saucesListUpdate = (req, res, next) => {
  const sauces = new SaucesData({
    _id: req.params.id,
    userId: req.body.userId,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    mainPepper: req.body.mainPepper,
    imageUrl: req.body.imageUrl,
    heat: req.body.heat,
    likes: req.body.heat,
    dislikes: req.body.dislikes,
    userLiked: req.body.userLiked,
    userDisliked: req.body.userDisliked,
  });
  SaucesData.updateOne({ _id: req.params.id }, sauces)
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
  SaucesData.deleteOne({ _id: req.paramas.id })
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
};
exports.saucesListLike = (req, res) => {
  const { userId } = req.body;
  const sauceId = req.params.id;
  const action = req.body.like;

  sauceData.findById(sauceId, (err, sauce) => {
    if (err) return res.status(500).json({ error: "Error finding sauce" });
    if (!sauce) return res.status(404).json({ error: "Sauce not found" });

    let userRecord = sauce.usersLiked.find((r) => r.userId === userId);

    if (!userRecord) {
      userRecord = { userId, likes: 0, dislikes: 0 };
      sauce.usersLiked.push(userRecord);
    }

    const updateLikes = () => {
      if (userRecord.likes % 2 === 0) {
        userRecord.likes = 0;
        sauce.usersLiked = sauce.usersLiked.filter((r) => r.userId !== userId);
      } else {
        userRecord.likes = Math.min(userRecord.likes + 1, 2);
      }
      return userRecord.likes;
    };

    const updateDislikes = () => {
      if (userRecord.dislikes % 2 === 0) {
        userRecord.dislikes = 0;
        sauce.usersLiked = sauce.usersLiked.filter((r) => r.userId !== userId);
      } else {
        userRecord.dislikes = Math.max(userRecord.dislikes - 1, -1);
      }
      return userRecord.dislikes;
    };

    sauce.save((err) => {
      if (err) return res.status(500).json({ error: "Error saving sauce" });
      res.json({
        likes: action === 1 ? updateLikes() : userRecord.likes,
        dislikes: action === -1 ? updateDislikes() : userRecord.dislikes,
      });
    });
  });
};
