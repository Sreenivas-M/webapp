const mongoose = require("mongoose");

const Post = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Auth",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
        type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", Post);
