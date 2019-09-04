const User = require("../models/User");

const registerController = async (req, res) => {
  const data = req.body;
  const user = await User.findOne({ email: data.email });
  if (user) {
    return res.status(409).send("User already registered");
  } else {
    const newUser = new User(req.body);
    try {
      await newUser.save();
    } catch (err) {
      res.send(err);
    }
  }
};

module.exports = { registerController };
