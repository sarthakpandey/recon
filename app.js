const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo")(session);
const authRouter = require("./routes/api/authRouter");
const passport = require("./config/passport");

require("dotenv").config();

const keys = require("./config/keys");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/auth", authRouter);

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("DB connected");
  })
  .catch(err => {
    console.log("Database not connected");

    console.error(err);
  });

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: "Rab ke bande"
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
