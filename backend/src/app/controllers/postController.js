const Post = require("../models/post");
const User = require("../models/user");
const Axios = require("axios").default;
class PostController {
  createPost = async (req, res) => {
    const URLMAP = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.addressCheckin}&key=AIzaSyC3wFFNSJDLnh2HRy8Caw3wYHF5D76dRFA`;
    const encodedURI = encodeURI(URLMAP);
    const location = await Axios.get(encodedURI);

    User.findById({
      _id: req.body.userId,
    })
      .then((dataUser) => {
        Post.create({
          images: req.file.path,
          content: req.body.content,
          location: {
            name: req.body.addressCheckin,
            latitude: location.data.results[0].geometry.location.lat,
            longitude: location.data.results[0].geometry.location.lng,
          },
          user: {
            userId: req.body.userId,
            username: dataUser.username,
            avatar: dataUser.avatar,
            address: dataUser.address,
            fullName: dataUser.fullName,
          },
          createdAt: req.body.createdAt,
        })
          .then((result) => {
            res.json({
              message: true,
              result,
            });
          })
          .catch((err) => {
            res.json({
              message: false,
              err,
            });
          });
      })
      .catch((err) => {
        res.json({
          message: false,
          err,
        });
      });
  };

  createComment = async (req, res) => {
    const checkUser = await User.findById({ _id: req.body.userId });

    Post.findByIdAndUpdate(
      {
        _id: req.body.postId,
      },
      {
        $push: {
          comment: {
            user: {
              userId: checkUser._id,
              username: checkUser.username,
              address: checkUser.address,
              avatar: checkUser.avatar,
            },
            contentCmt: req.body.contentCmt,
            createdCmt: req.body.createdCmt,
          },
        },
      }
    )
      .then((result) => {
        res.json({
          message: true,
          result,
        });
      })
      .catch((err) => {
        res.json({
          message: false,
          err,
        });
      });
  };

  getPost = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const dataPost = await Post.find()
        .sort({ createdAt: 1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      res.json({
        message: true,
        dataPost,
      });
    } catch (error) {
      res.json({
        message: false,
        error,
      });
    }
  };

  getPostDetail = (req, res) => {
    Post.findById({
      _id: req.query.postId,
    })
      .then((result) => {
        res.json({
          message: true,
          result,
        });
      })
      .catch((err) => {
        res.json({
          message: false,
          err,
        });
      });
  };

  getPostUser = (req, res) => {
    Post.find({
      "user.userId": req.query.userId,
    })
      .then((result) => {
        res.json({
          message: true,
          result,
        });
      })
      .catch((err) => {
        res.json({
          message: false,
          err,
        });
      });
  };
}
module.exports = new PostController();
