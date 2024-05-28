require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db.js");
const userRoute = require("./routes/userRoute.js");
const chatRoute = require("./routes/chatRoute.js");
const messageRoute = require("./routes/messageRoute.js");
const path = require("path");
const { errorHandler, invalidUrl } = require("./middlewares/errorHandler.js");
const cors = require("cors");

// Connect to the database
connectDB();

const app = express();
app.use(express.json());
var allowedOrigins = [
  "http://localhost:1234",
  "https://blabber-chat-app.vercel.app",
  "https://blabber-pwhtqbeth-abhisheks-projects-e2710dbc.vercel.app",
  "https://blabber-the-chat-app.vercel.app",
  "https://blabber-the-chat-kl3d3hj0x-abhisheks-projects-e2710dbc.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.get("/", (req, res) => {
  res.send("API is running successfully");
});

// API routes
app.use("/api/users", userRoute);
app.use("/api/chat", chatRoute);
app.use("/api/messages", messageRoute);

if (process.env.NODE_ENV === "Production") {
  console.log = function () {};
  console.error = function () {};
}

app.use(errorHandler);
app.use(invalidUrl);

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});

// Socket server setup
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    function(origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  },
});

// Checking client connection with socket
io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("joinChat", (room) => {
    socket.join(room);
  });

  socket.on("typing", (chatId) => {
    socket.in(chatId).emit("typing");
  });

  socket.on("stop typing", (chatId) => {
    console.log("typing stop");
    socket.in(chatId).emit("stop typing");
  });

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      console.log("Msg sent");
      socket.in(user._id).emit("message received", newMessageRecieved);
    });
  });
});
