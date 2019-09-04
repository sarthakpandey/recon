const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config();

const keys = require("./config/keys");
const authRouter = require("./routes/api/authRouter");


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/auth", authRouter);

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
