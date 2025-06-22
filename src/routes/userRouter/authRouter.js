const express = require("express");

const {
  signIn
} = require("@Controllers/authController");

const router = express.Router();

router.route("/signin").post(signIn);

module.exports = router;
