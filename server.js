const http = require("http");
const express = require("express");

const app = express();

//Creating a server
const server = http.createServer(app);
//Creating a port
const port = process.env.PORT || 3000;

//To make use of the styling we did on "index.html" to serve styling
app.use(express.static(__dirname + "/public"));

//To get the file we want to server
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//Setup socket.io

const io = require("socket.io")(server);
var users = {};

io.on("connection", (socket) => {
  //   console.log(socket.id);
  socket.on("new-user-joined", (username) => {
    users[socket.id] = username;
    socket.broadcast.emit("user-connected", username);
    io.emit("user-list", users);
    // console.log(users);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", (user = users[socket.id]));
    delete users[socket.id];
    io.emit("user-list", users);
  });
});

//Setup ends

server.listen(port, () => {
  console.log("Server started at " + port);
});
