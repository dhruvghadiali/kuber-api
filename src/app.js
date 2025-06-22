require("colors");
require("module-alias/register");

const path = require("path");
const express = require("express");

var cors = require("cors");

const errorHandler = require("./middleware/error");
const commonRouter = require("./router/commonRouter");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.use("/", commonRouter);
app.use((req, res) => {
  res.status(404);
  res.sendFile(path.join(__dirname, "errorPage", "invalidEndpoint.html"));
});
app.use(errorHandler);

module.exports = app;
