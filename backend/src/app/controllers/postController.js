const Post = require("../models/post");
const User = require("../models/user");
class PostController {
  createPost = (req, res) => {
    User.findById({
      _id: req.body.userId,
    })
      .then((dataUser) => {
        Post.create({
          images: req.body.images,
          content: req.body.content,
          location: {
            name: req.body.location.name,
            icon: req.body.location.icon,
          },
          user: {
            userId: req.body.userId,
            username: dataUser.username,
            avatar: dataUser.avatar,
            address: dataUser.address,
            fullName: dataUser.fullName,
          },
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

  getPost = (req, res) => {
    Post.find()
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
}
module.exports = new PostController();
