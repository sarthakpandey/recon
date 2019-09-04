const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRouter = require("./routes/authRouter");
require("dotenv").config();
console.log(process.env.PASSWORD);

const keys = require("./config/keys");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser({ extended: true }));

app.use("/auth", authRouter);

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => {
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server started at ${PORT}`);
    });
  })
  .catch(err => {
    console.log("Database not connected");

    console.error(err);
  });
