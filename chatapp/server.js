const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const { formatMessage, generateUniqueId } = require("./utils/messages");
const createAdapter = require("@socket.io/redis-adapter").createAdapter;
const redis = require("redis");
require("dotenv").config();
const { createClient } = redis;
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");
const { apiCallPOST, stringToFormData } = require("./utils/sentimentAPI");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

const botName = "ChattyG Bot";

(async () => {
  pubClient = createClient({ url: process.env.REDIS_URL_EXTERNAL || "redis://127.0.0.1:6379" });
  await pubClient.connect();
  subClient = pubClient.duplicate();
  io.adapter(createAdapter(pubClient, subClient));
})();

// Run when client connects
io.on("connection", (socket) => {
  // console.log(io.of("/").adapter);
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit("message", formatMessage(botName, "Welcome to ChattyG!"));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // Listen for chatMessage
  socket.on("chatMessage", async (msg) => {
    const user = getCurrentUser(socket.id);
    let sentiment;
    const messageId = generateUniqueId();

    if (!user) {
      msg = "undefined"
      io.emit("message", formatMessage("System", msg, null, null));
      return;
    }

    io.to(user.room).emit("message", formatMessage(user.username, msg, null, messageId));

    try {
      sentiment = await apiCallPOST(
        process.env.SENTIMENT_API_URL,
        stringToFormData(msg)
      );

    } catch (error) {
      console.error("Error getting message sentiment:", error);
    }

    io.to(user.room).emit("sentiment", formatMessage(null, null, sentiment.prediction, messageId));
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
