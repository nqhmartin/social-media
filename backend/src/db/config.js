const mongoose = require("mongoose");

const connect = async () => {
  await mongoose
    .connect(
      "mongodb+srv://nqhmartin:huysonthanh1@nqhmartin.n2rm7sn.mongodb.net/socialmedia?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("connect success");
    })
    .catch(() => {
      console.log("Connect failed");
    });
};

module.exports = { connect };
