const express = require("express");
const router = express.Router();
const {
  userSignup,
  userLogin,
  allUsers,
} = require("../controllers/userController.js");
const {
  signupIpValidation,
  loginIpValidation,
} = require("../middlewares/userValidation.js");
const { authUser } = require("../middlewares/authMiddleware.js");

router.post("/signup", signupIpValidation, userSignup);
router.post("/login", loginIpValidation, userLogin);
router.get("/", authUser, allUsers);

module.exports = router;
