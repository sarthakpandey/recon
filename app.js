const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo")(session);
const passport = require("./config/passport");
const authRouter = require("./routes/api/authRouter");
const userRouter = require("./routes/api/userRouter");
const friendRouter = require("./routes/api/friendRouter");
const postRouter = require("./routes/api/postRouter");
const profileRouter = require("./routes/api/profileRouter");

require("dotenv").config();

const keys = require("./config/keys");

const app = express();

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: "Rab ke bande"
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/profile", profileRouter);
app.use("/api/post", postRouter);
app.use("/api/friend", friendRouter);

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("DB connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server started at ${PORT}`);
    });
    
  })
  .catch(err => {
    console.log("Database not connected");

    console.error(err);
  });
