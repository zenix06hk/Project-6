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
