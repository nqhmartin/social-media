const Auth = require("./auth");
const route = (app) => {
  app.get("/", (req, res) => {
    res.json({
      message: "Hello world",
    });
  });

  app.use("/auth", Auth);
};

module.exports = route;
