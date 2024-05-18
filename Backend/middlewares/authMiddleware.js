const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const authUser = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(404).send("Invalid authorization header");
  }
  const token = authHeader.split(" ")[1];

  await jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      throw Error("Invalid token");
    }
    console.log(decoded);
    req.user = await User.findById(decoded.id).select("-password");
    console.log("Authenticated");
    next();
  });
});

module.exports = { authUser };
