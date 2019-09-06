const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("../config/passport");

const authStatusController = async (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("logged in");
    return next();
  } else {
    res.send("Not logged in");
  }
};

const registerController = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).send("User already registered");
  }
  try {
    const salt = await bcrypt.genSalt(12);

    const hashedPassword = await bcrypt.hash(password, salt);

    console.log(hashedPassword);

    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();

    return res.json(newUser);
  } catch (err) {
    console.log("in error", err);
    res.json(err);
  }
};

const loginController = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.send(err);
    }
    if (!user) {
      return res.status(404).json({ error: "No user found" });
    } else {
      req.logIn(user, err => {
        if (!err) {
          return res.json(user);
        } else {
          return res.json(err);
        }
      });
    }
  })(req, res, next);
};

const logoutController = (req, res) => {
  req.logout();
  return res.send("Logged out successfully");
};

module.exports = {
  authStatusController,
  registerController,
  loginController,
  logoutController
};
