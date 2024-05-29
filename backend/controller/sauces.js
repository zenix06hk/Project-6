const saucesModel = require("../model/sauces");

exports.sauceList = (req, res) => {
  res.send([
    {
      userId: "33",
      name: "String — name of the sauce.",
      manufacturer: "String — manufacturer of the sauce.",
      description: "String — description of the sauce.",
      mainPepper: "String — the main pepper ingredient in the sauce.",
      imageUrl: "String — the URL for the picture of the sauce uploaded by the",
      heat: 222,
      likes: 4243432,
      dislikes: 234324432,
      usersLiked: ["22"],
      usersDisliked: ["23"],
    },
  ]);
};

exports.singleSauces = (req, res) => {
  res.send({
    userId: "33",
  });
};

exports.saucesList = (req, res) => {
  res.status(200).json({
    message: " This is point to route GET",
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

exports.saucesListSave = (req, res) => {
  res.status(200).json({
    message: " This is point to sauce List save item",
  });
};

exports.saucesListUpdate = (req, res) => {
  res.status(200).json({
    message: " This is point to sauce List update",
  });
};
exports.saucesListDelete = (req, res) => {
  res.status(200).json({
    message: " This is point to sauce List delete item",
  });
};
exports.saucesListLike = (req, res) => {
  res.status(200).json({
    message: " This is point to sauce List like item",
  });
};
