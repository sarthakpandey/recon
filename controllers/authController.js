const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerController = async (req, res) => {
  const data = req.body;
  const user = await User.findOne({ email: data.email });
  if (user) {
    return res.status(409).send("User already registered");
  } else {
    const { password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 12);
    const newUser = new User({ ...req.body, password: hashedPassword });
    try {
      await newUser.save();
      return res.send(newUser);
    } catch (err) {
      res.send(err);
    }
  }
};

module.exports = { registerController };
