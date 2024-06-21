require("colors");
const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
var cors = require('cors');

const app = express();

dotenv.config({ path: "./config.env" });

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

(async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    app.listen(3000);

    app.use((req, res) => {
        res.status(200).json({
            data: [],
            message: 'Server is stared',
          });
    });
  } catch (err) {
    console.log("error: " + err);
  }
})();