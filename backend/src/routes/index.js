const Auth = require("./auth");
const Post = require("./post");
const { data } = require("../app/controllers/constant");
const uploadRouter = require("./cloudinary-upload");
const route = (app) => {
  app.get("/", (req, res) => {
    res.json({
      message: "Hello world",
    });
  });

  app.use("/auth", Auth);
  app.use("/post", Post);
  // UPLOAD CLOUD
  app.use("/uploads", uploadRouter);

  // JSON ADDRESS
  app.get("/address", (req, res) => {
    res.json({
      success: true,
      data,
    });
  });
};

module.exports = route;
