const saucesModel = require("../models/sauces");

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
  // if (!req.body.sauces) {
  //   return res.status(400).json({ error: "Missing sauces data" });
  // }
  // req.body.sauces = JSON.parse(req.body.sauces);
  const sauceDataForm = JSON.parse(req.body.sauce);
  // console.log(sauceDataForm);
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
    userLiked: [],
    userDisliked: [],
  });
  // console.log(sauces.userId);
  // console.log(sauces.name);
  // console.log(sauces.manufacturer);
  // console.log(sauces.description);
  // console.log(sauces.mainPepper);
  // console.log(sauces.imageUrl);
  // console.log(sauces.heat);
  // console.log(sauces.likes);
  // console.log(sauces.dislikes);
  // console.log(sauces.userLiked);
  // console.log(sauces.userDisliked);

  sauces
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post saved successfully",
      });
    })

    .catch((error) => {
      console.log(error);
      res.status(400).json({
        error: error,
      });
    });
};

exports.saucesListId = (req, res, next) => {
  const requestSegments = req.path.split("/");
  const requestSegmentsObject = { id: requestSegments };
  console.log(requestSegments);
  console.log(requestSegmentsObject);
  saucesModel
    .findOne({ _id: req.body._id })
    .then((sauce) => {
      console.log(req.body);
      if (!user) {
        return res.status(200).json(sauce);
      }
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
  console.log(typeof requestSegments[1]);
};

exports.saucesListUpdate = (req, res, next) => {
  const sauceDataForm = JSON.parse(req.body.sauce);
  const sauces = new saucesModel({
    _id: sauceDataForm.id,
    userId: sauceDataForm.userId,
    name: sauceDataForm.name,
    manufacturer: sauceDataForm.manufacturer,
    description: sauceDataForm.description,
    mainPepper: sauceDataForm.mainPepper,
    imageUrl: sauceDataForm.imageUrl,
    heat: sauceDataForm.heat,
    likes: 0,
    dislikes: 0,
    userLiked: [],
    userDisliked: [],
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
