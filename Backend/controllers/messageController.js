const asyncHandler = require("express-async-handler");
const Chat = require("../model/chatModel");
const User = require("../model/userModel");
const Message = require("../model/messageModel");

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name profilePic")
      .populate("chat")
      .populate("chat.latestMessage", "sender content createdAt"); // Include createdAt field in the response
    res.json(messages);
  } catch (error) {
    res.json({ error: error.message });
  }
});

const sendMessage = asyncHandler(async (req, res) => {
  const { chatId, content } = req.body;
  console.log(chatId, content);
  if (!chatId || !content) {
    return res.status(400).json({ message: "Enter proper inputs" });
  }

  try {
    const newMessage = await Message.create({
      sender: req.user._id,
      content: content,
      chat: chatId,
    });

    console.log(newMessage);
    // Populate fields including createdAt
    await newMessage.populate("sender", "name profilePic createdAt");

    await newMessage.populate("chat");
    await newMessage.populate("chat.latestMessage", "sender content");
    const fullMessage = await newMessage.populate({
      path: "chat.users",
      select: "name profilePic email createdAt", // Include createdAt field
    });

    console.log("Message saved");
    console.log(fullMessage);
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: fullMessage,
    });

    res.json(fullMessage);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = {
  allMessages,
  sendMessage,
};
