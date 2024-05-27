const express = require("express");
const router = express.Router();

const {
  accessChat,
  fetchChat,
  createGroupChat,
  updateGroupName,
  removeUser,
  addUser,
  fetchPchat,
} = require("../controllers/chatController");

const { authUser } = require("../middlewares/authMiddleware");

router.route("/").post(authUser, accessChat);
router.route("/").get(authUser, fetchChat);
router.route("/:chatId").get(authUser, fetchPchat);
router.route("/group").post(authUser, createGroupChat);
router.route("/rename").put(authUser, updateGroupName);
router.route("/groupremove").put(authUser, removeUser);
router.route("/groupadd").put(authUser, addUser);

module.exports = router;
