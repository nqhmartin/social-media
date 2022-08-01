const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const route = require("./src/routes/index");
const { connect } = require("./src/db/config");

//connect database
connect();

// test realtime
const io = new Server(server);
io.on("connection", (socket) => {
  console.log("New client connected   " + socket.id);
  socket.emit("getId", socket.id);

  socket.on("sendDataClient", function (data) {
    console.log("🚀 ~ file: index.js ~ line 11 ~ socket.on ~ data", data);
    io.emit("sendDataServer", { data });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected"); // Khi client disconnect thì log ra terminal.
  });
});

app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);
app.use(
  express.json({
    limit: "50mb",
  })
);
route(app);
server.listen(3000, () => {
  console.log("listening on *:3000");
});
