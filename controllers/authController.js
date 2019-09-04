const User = require("../models/User");
const bcrypt = require("bcryptjs");

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
    console.log('in error',err);
    res.json(err);
  }
};

module.exports = { registerController };
