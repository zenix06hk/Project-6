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
  likes: Number,
  users: [
    {
      liked: string,
      disliked: string,
    },
  ],
});

module.exports = mongoose.model("sauces", saucesSchema);
