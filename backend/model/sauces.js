const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const saucesSchema = new Schema({
  //(equals mongoose.Schema)
  userId: String,
  name: String,
  manufacturer: String,
  description: String,
  mainPepper: String,
  imageUrl: String,
  heat: Number,
  likes: Number,
  dislikes: Number,
  userLiked: [
    {
      userId: String,
    },
  ],
  userDisliked: [
    {
      userId: String,
    },
  ],
});

module.exports = model("saucesInfo", saucesSchema);
