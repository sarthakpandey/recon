const User = require("../models/User");
const Profile = require("../models/Profile");

const testController = (req, res) => {
  res.json({
    success: "This route is working"
  });
};

const profileByHandleController = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      handle: req.params.handle
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res
        .status(404)
        .json({ noProfile: "There is no profile for this handle" });
    }

    res.json(profile);
  } catch (err) {
    return res
      .status(404)
      .json({ noProfile: "There is no profile for this handle" });
  }
};

const profileByUserIdController = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res
        .status(404)
        .json({ noProfile: "There is no profile for this user id" });
    }

    res.json(profile);
  } catch (err) {
    return res
      .status(404)
      .json({ noProfile: "There is no profile for this user id" });
  }
};

const profileAllController = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);

    if (!profiles) {
      return res.status(404).json({ noProfiles: "There are no profiles" });
    }

    res.json(profiles);
  } catch (err) {
    return res.status(404).json({ noProfiles: "There are no profiles" });
  }
};

const profileCurrentGetController = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res
        .status(404)
        .json({ noProfile: "There is no profile for the current user" });
    }

    res.json(profile);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

const profileCurrentPostController = async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user._id },
        { $set: req.body },
        { new: true }
      );
      return res.json(profile);
    }

    const { handle } = req.body;

    profile = await Profile.findOne({ handle });

    if (profile) {
      return res.status(400).json({ error: "Handle taken" });
    }

    profile = await new Profile(req.body).save();

    res.json(profile);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

module.exports = {
  testController,
  profileByHandleController,
  profileByUserIdController,
  profileAllController,
  profileCurrentGetController,
  profileCurrentPostController
};
