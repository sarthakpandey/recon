const User = require("../models/User");
const Profile = require("../models/Profile");
const Post = require("../models/Post");

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
    
    if (req.body.skills)
      req.body.skills = req.body.skills.split(",").map(item => item.trim());

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

const deleteAccountController = async (req, res) => {
  try {
    await Post.deleteMany({ user: req.user._id });

    await Profile.findOneAndRemove({ user: req.user._id });

    await User.findOneAndRemove({ _id: req.user._id });

    res.json({
      success: "Deleted the account"
    });
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

const experiencePostController = async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id });

    const newExp = req.body;

    profile.experience.unshift(newExp);

    profile = await profile.save();

    res.json(profile);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

const educationPostController = async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id });

    const newEdu = req.body;

    profile.education.unshift(newEdu);

    profile = await profile.save();

    res.json(profile);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

const experienceDeleteController = async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id });

    const removeIndex = profile.experience
      .map(item => item._id.toString())
      .indexOf(req.params.exp_id);

    if (removeIndex === -1) {
      return res.status(500).json({ err: "Server error" });
    }

    profile.experience.splice(removeIndex, 1);

    profile = await profile.save();

    return res.status(200).json(profile);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

const educationDeleteController = async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id });

    const removeIndex = profile.education
      .map(item => item._id.toString())
      .indexOf(req.params.exp_id);

    if (removeIndex === -1) {
      return res.status(500).json({ err: "Server error" });
    }

    profile.education.splice(removeIndex, 1);

    profile = await profile.save();

    return res.status(200).json(profile);
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
  profileCurrentPostController,
  deleteAccountController,
  experiencePostController,
  educationPostController,
  experienceDeleteController,
  educationDeleteController
};
