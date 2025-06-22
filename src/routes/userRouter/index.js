const express = require("express");

const authRouter = require("@Routes/userRouter/authRouter");

const router = express.Router();

router.use("/", authRouter);

module.exports = router;
