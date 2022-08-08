const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
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
      default: "https://cdn-icons-png.flaticon.com/512/555/555515.png",
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
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
  like: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: String,
  },
});

module.exports = mongoose.model("post", PostSchema);
