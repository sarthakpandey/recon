const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("../config/passport");

const authStatusController = async (req, res) => {
  if (req.isAuthenticated()) {
    console.log("logged in");
    return res.json({ user: req.user });
  } else {
    return res.send("Not logged in");
  }
};

const authCheckController = async (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(req.user);
    return next();
  } else {
    console.log("logged out");
    return res.send("Not logged in");
  }
};

const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).send("User already registered");
  }
  try {
    const salt = await bcrypt.genSalt(12);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return res.json(newUser);
  } catch (err) {
    res.json(err);
  }
};

const loginController = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.status(403).send("Already authenticated");
  }

  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.send(err);
    }
    if (!user) {
      return res.status(404).json({ error: "No user found" });
    } else {
      req.logIn(user, err => {
        if (!err) {
          return res.json({ user });
        } else {
          return res.json(err);
        }
      });
    }
  })(req, res, next);
};

const logoutController = (req, res) => {
  req.logout();
  req.session = null;
  return res.send("Logged out successfully");
};

module.exports = {
  authStatusController,
  authCheckController,
  registerController,
  loginController,
  logoutController
};
