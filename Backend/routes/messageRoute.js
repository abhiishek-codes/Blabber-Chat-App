const express = require("express");
const router = express.Router();
const { authUser } = require("../middlewares/authMiddleware");
const {
  allMessages,
  sendMessage,
} = require("../controllers/messageController");

router.route("/:chatId").get(authUser, allMessages);
router.route("/").post(authUser, sendMessage);

module.exports = router;
