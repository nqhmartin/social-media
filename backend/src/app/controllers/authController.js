const User = require("../models/user");
var bcrypt = require("bcryptjs");
const createUser = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .then((result) => {
      if (result) {
        res.json({ success: false, message: "username already exists" });
      } else {
        var salt = bcrypt.genSaltSync(10);

        var hash = bcrypt.hashSync(req.body.password, salt);

        User.create({ ...req.body, password: hash })
          .then((result) => {
            res.json({
              success: true,
              result,
            });
          })
          .catch((err) => {
            res.json(err);
          });
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

const SignIn = async (req, res) => {
  const check = await User.findOne({
    username: req.body.username,
  });
  if (!check) {
    res.json({
      success: "false",
      message: "This account has already existed",
    });
  } else {
    bcrypt
      .compare(req.body.password, check.password)
      .then((result) => {
        if (result) {
          User.findOne({
            username: check.username,
          })
            .then((result) => {
              res.json({ success: true, result });
            })
            .catch((err) => {
              res.json(err);
            });
        } else {
          res.json({
            success: false,
            message: "Wrong password",
          });
        }
      })
      .catch((err) => console.log(err));
  }
};

module.exports = { SignIn, createUser };
