const express = require("express");
const http = require("http");
const socket = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socket(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 5000;

// const {addUser, removeUser, getUser, getUsersInRoom} = require('./user');

const route = require("./routes");
const { use } = require("./routes");
const {
  addUser,
  removeUser,
  getUser,
  getOtherUser,
  userMove,
  otherUserMove,
  getUsersInRoom,
} = require("./Player");

app.use(route);
app.use(cors());

// app.use('*', (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// })

io.on("connection", (socket) => {
  console.log("Connected!");

  socket.on("join", ({ Name, room }, callback) => {
    // console.log(name, room);
    const { error, user } = addUser({ id: socket.id, Name, room });

    if (error) return callback({ error: error });

    if (!user) return callback({ error: "Something Went Wrong" });

    if (!user.name || !user.room || !socket || !socket.id)
      return callback({ error: "Something Went Wrong" });

    const otherUser = getOtherUser(socket.id, user.room);

    let otherUserName;
    console.log(otherUser);
    if (otherUser) otherUserName = otherUser.name;
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room`,
      otherUser: otherUserName,
    });
    // socket.emit("symbol", {Symbol: user.symbol})
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name}, has joined` });

    socket.join(user.room);

    console.log(getUsersInRoom(user.room), "PLAYERS");
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback({ symbol: user.symbol });
  });

  // socket.on('sendMessage', (message, callback) => {
  //   const user = getUser(socket.id);

  //   if(!user || !socket || !user.room || !socket.id){
  //     callback("Something Went Wrong.")
  //   }

  //   io.to(user.room).emit('message', {user: user.name, text: message});
  //   io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});

  //   callback();
  // })

  socket.on("move", ({ row, col }, callback) => {
    const user = getUser(socket.id);
    // console.log(user);
    if (!user || !socket || !user.room || !socket.id) {
      return callback("Something went wrong");
    }
    const otherUser = getOtherUser(socket.id, user.room);

    if (!otherUser) {
      return callback("Please wait for player use to join");
    }

    const Score = userMove(socket.id, row, col);
    const Board2 = otherUserMove(otherUser.id, row, col);
    // console.log(Score.board);
    if (Score.winner) {
      io.to(user.room).emit("moveMade", {
        user: user.name,
        otherUser: otherUser.name,
        board: Score.board,
        winner: user.name,
        message: `${user.name} won the game`,
      });
    } else if (Score.draw) {
      io.to(user.room).emit("moveMade", {
        user: user.name,
        otherUser: otherUser.name,
        board: Score.board,
        draw: true,
        message: `This match is a draw`,
      });
    } else {
      io.to(user.room).emit("moveMade", {
        user: user.name,
        otherUser: otherUser.name,
        board: Score.board,
        message: `${user.name} turn is over. Now it's${otherUser.name}'s turn.`,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("User has left!");

    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left`,
        leave: true,
      });
    }
  });
});

// app.get('/', (req, res) => {
//   res.send("HELLO WORLD!")
// })

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

server.listen(PORT, () => console.log("Server running"));
