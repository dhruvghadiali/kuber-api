const mongoose = require("mongoose");
const app = require("./app");

(async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect("mongodb+srv://dhruvghadiali21:1VpqzXolEQ9zFq88@cluster0.ipknbfw.mongodb.net/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(3000, () => {
      console.log(
        `Server is running on port 3000`.green.bold
      );
      console.log(`Database connected successfully`.green.bold);
    });
  } catch (err) {
    // console.log("error: " + err, process.env.DB_URI);
    console.log("error: " + err);
  }
})();
