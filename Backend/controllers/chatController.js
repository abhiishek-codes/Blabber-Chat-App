const asyncHandler = require("express-async-handler");
const Chat = require("../model/chatModel");
const express = require("express");

//to access chat with user and to create chat with  user if chat not available.

const accessChat = asyncHandler(async (req, res) => {
  const { userid } = req.body;

  if (!userid) {
    res.status(400).json({ msg: "Didnt recive the user id" });
  }
  let isChat = await Chat.find({
    groupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userid } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await Chat.populate(isChat, {
    path: "latestMessage.sender",
    select: "name profilePic email",
  });

  if (isChat.length > 0) return res.status(200).send(isChat[0]);
  else {
    const chatData = {
      chatName: "sender",
      users: [req.user._id, userid],
      groupChat: false,
    };

    try {
      const newChat = await Chat.create(chatData);
      const fullChat = await Chat.findById(newChat._id).populate(
        "users",
        "-password"
      );
      res.status(200).json(fullChat);
    } catch (error) {
      res.status(500).send("Chat cant  be created  ", error);
    }
  }
});

// to get all chat of a user

const fetchChat = asyncHandler(async (req, res) => {
  console.log("Inside fetch Chat");
  const chat = await Chat.find({ users: req.user._id })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .sort({ updatedAt: -1 })
    .populate("latestMessage.sender", "name profilePic email");

  if (chat.length > 0) res.status(200).send(chat);
  else res.status(404).json({ msg: "No chat found" });
});

// to create Group Chat

const createGroupChat = asyncHandler(async (req, res) => {
  var { name, users } = req.body;

  if (!name || !users)
    return res.status(404).json({ msg: "Send all the deatils" });

  users = JSON.parse(users);

  if (users.length < 2)
    res
      .status(404)
      .json({ msg: "For group chat we need more than two members" });
  else {
    users.push(req.user);

    try {
      const newChat = new Chat({
        chatName: name,
        users: users,
        groupChat: true,
        groupAdmin: req.user._id,
      });

      await newChat.save();

      const fullChat = await Chat.findById(newChat._id)
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

      res.status(200).json({ fullChat });
    } catch (error) {
      res.status(500).send("Chat cant  be created  ", error.message);
    }
  }
});

//to update GroupchatName

const updateGroupName = asyncHandler(async (req, res) => {
  const { chatId, updatedName } = req.body;
  if (!chatId || !updatedName)
    return res.status(404).json({ msg: "Enter all Details properly" });

  const updateName = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: updatedName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (updateName) {
    res.status(200).json(updateName);
  } else {
    res.status(404).json({ msg: "Chat not found" });
  }
});

//to add User
const addUser = asyncHandler(async (req, res) => {
  const { userId, chatId } = req.body;
  if (!userId || !chatId)
    return res.status(404).json({ msg: "Enter Details properly" });

  const newChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (newChat) res.status(200).send(newChat);
  else {
    res.status(404).json({ msg: "User was not added" });
  }
});

const removeUser = asyncHandler(async (req, res) => {
  const { userId, chatId } = req.body;
  if (!userId || !chatId)
    return res.status(404).json({ msg: "Enter Details properly" });

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (updatedChat) res.status(200).send(updatedChat);
  else {
    res.status(404).json({ msg: "User was not removed" });
  }
});

module.exports = {
  accessChat,
  fetchChat,
  createGroupChat,
  updateGroupName,
  removeUser,
  addUser,
};
