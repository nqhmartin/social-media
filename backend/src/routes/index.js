const Auth = require("./auth");
const Post = require("./post");
const { data } = require("../app/controllers/constant");
const route = (app) => {
  app.get("/", (req, res) => {
    res.json({
      message: "Hello world",
    });
  });

  app.use("/auth", Auth);
  app.use("/post", Post);
  app.get("/address", (req, res) => {
    res.json({
      success: true,
      data,
    });
  });
};

module.exports = route;
