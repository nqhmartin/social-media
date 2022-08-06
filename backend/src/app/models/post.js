const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    images: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    location: {
      name: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
      },
    },
    user: {
      userId: {
        type: String,
      },
      username: {
        type: String,
      },
      fullName: {
        type: String,
      },
      address: {
        type: String,
      },
      avatar: {
        type: String,
      },
    },
    comment: [
      {
        user: {
          userId: {
            type: String,
          },
          username: {
            type: String,
          },
          address: {
            type: String,
          },
          avatar: {
            type: String,
          },
        },
        contentCmt: {
          type: String,
        },
        createdCmt: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", PostSchema);
