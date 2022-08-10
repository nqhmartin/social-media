const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const route = require("./src/routes/index");
const { connect } = require("./src/db/config");
const path = require("path");
//connect database
connect();

// test realtime
const io = new Server(server, {
  path: "/message",
});
io.on("connection", (socket) => {
  console.log("New client connected   " + socket.id);
  socket.emit("getId", socket.id);

  socket.on("sendDataClient", function (data) {
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
app.use("/images", express.static(path.join(__dirname, "/images")));
server.listen(3000, () => {
  console.log("listening on *:3000");
});
route(app);
