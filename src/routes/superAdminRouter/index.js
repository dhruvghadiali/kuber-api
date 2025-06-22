const express = require("express");

const authRouter = require("@Routes/superAdminRouter/authRouter");

const router = express.Router();

router.use("/", authRouter);

module.exports = router;
