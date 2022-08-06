const Auth = require("./auth");
const Post = require("./post");
const route = (app) => {
  app.get("/", (req, res) => {
    res.json({
      message: "Hello world",
    });
  });

  app.use("/auth", Auth);
  app.use("/post", Post);
};

module.exports = route;
