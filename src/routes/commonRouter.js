const express = require("express");
const { testRoute } = require("@Controllers/testController");


const router = express.Router();

router
    .route("/test-route")
    .get(testRoute);

module.exports = router;