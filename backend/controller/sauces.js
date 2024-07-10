const saucesModel = require("../models/sauces");

exports.saucesList = (req, res, next) => {
  saucesModel
    .find()
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.saucesSave = (req, res, next) => {
  // if (!req.body.sauces) {
  //   return res.status(400).json({ error: "Missing sauces data" });
  // }
  const url = req.protocol + "://" + req.get("host");
  // req.body.sauces = JSON.parse(req.body.sacues);
  const sauces = new saucesModel({
    userId: req.body.userId,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    mainPepper: req.body.mainPepper,
    imageUrl: url + "/images/" + req.file.filename,
    heat: req.body.heat,
    likes: req.body.heat,
    dislikes: req.body.dislikes,
    userLiked: req.body.userLiked,
    userDisliked: req.body.userDisliked,
  });
  console.log(sauces.name);
  sauces
    .save()
    .then((req, res, next) => {
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

exports.saucesListId = (req, res, next) => {
  saucesModel
    .findOne({
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
  const sauces = new saucesModel({
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
  saucesModel
    .updateOne({ _id: req.params.id }, sauces)
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
  saucesModel
    .deleteOne({ _id: req.paramas.id })
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
// exports.saucesListLike = (req, res) => {
//   const { userId } = req.body;
//   const sauceId = req.params.id;
//   const action = req.body.like;

//   sauceData.findById(sauceId, (err, sauce) => {
//     if (err) return res.status(500).json({ error: "Error finding sauce" });
//     if (!sauce) return res.status(404).json({ error: "Sauce not found" });

//     let userRecord = sauce.usersLiked.find((r) => r.userId === userId);

//     if (!userRecord) {
//       userRecord = { userId, likes: 0, dislikes: 0 };
//       sauce.usersLiked.push(userRecord);
//     }

//     const updateLikes = () => {
//       if (userRecord.likes % 2 === 0) {
//         userRecord.likes = 0;
//         sauce.usersLiked = sauce.usersLiked.filter((r) => r.userId !== userId);
//       } else {
//         userRecord.likes = Math.min(userRecord.likes + 1, 2);
//       }
//       return userRecord.likes;
//     };

//     const updateDislikes = () => {
//       if (userRecord.dislikes % 2 === 0) {
//         userRecord.dislikes = 0;
//         sauce.usersLiked = sauce.usersLiked.filter((r) => r.userId !== userId);
//       } else {
//         userRecord.dislikes = Math.max(userRecord.dislikes - 1, -1);
//       }
//       return userRecord.dislikes;
//     };

//     sauce.save((err) => {
//       if (err) return res.status(500).json({ error: "Error saving sauce" });
//       res.json({
//         likes: action === 1 ? updateLikes() : userRecord.likes,
//         dislikes: action === -1 ? updateDislikes() : userRecord.dislikes,
//       });
//     });
//   });
// };
