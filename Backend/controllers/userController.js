const asyncHandler = require("express-async-handler");
const User = require("../model/userModel.js");
const { generateToken } = require("../config/generateToken");
require("../config/config");

const userSignup = asyncHandler(async (req, res) => {
  const { name, uname, pass, pic } = req.body;
  const email = uname;
  const password = pass;
  const profilePic = pic;
  console.log(pic);
  const userExists = await User.findOne({ email });
  console.log(userExists);

  if (userExists) {
    res.status(400);
    throw Error("User already exists");
  }

  const newUser = new User({ name, email, password, profilePic });
  await newUser.save();

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      profilePic: newUser.profilePic,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw Error("Invalid user data");
  }
});

const userLogin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const email = username;
  const user = await User.findOne({ email });

  console.log(user);

  if (user && (await user.isValidPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw Error("Invalid email or password");
  }
});

const allUsers = asyncHandler(async (req, res) => {
  console.log(req.query.search);
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  console.log(keyword);
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

  res.send(users);
});

module.exports = { userSignup, userLogin, allUsers };
