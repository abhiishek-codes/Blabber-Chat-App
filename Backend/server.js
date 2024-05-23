const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const userRoute = require("./routes/userRoute.js");
const chatRoute = require("./routes/chatRoute.js");
const messageRoute = require("./routes/messageRoute.js");

const { errorHandler, invalidUrl } = require("./middlewares/errorHandler.js");
const cors = require("cors");
dotenv.config();

connectDB();
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:1234" }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", userRoute);
app.use("/api/chat", chatRoute);
app.use("/api/messages", messageRoute);

app.use(errorHandler);

app.use(invalidUrl);

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
