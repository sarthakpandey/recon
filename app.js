const express = require("express");
// const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo")(session);
const passport = require("./config/passport");
const authRouter = require("./routes/api/authRouter");
const userRouter = require("./routes/api/userRouter");
const postRouter = require("./routes/api/postRouter");
const profileRouter = require("./routes/api/profileRouter");
const path = require("path");

require("dotenv").config();

const keys = require("./config/keys");

const app = express();
// app.use(cors({ origin: true,  credentials: true }));

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
    unset: "destroy",
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: process.env.SECRET
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

// app.use(express.static(path.join(__dirname, "client/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/client/build/index.html"));
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
