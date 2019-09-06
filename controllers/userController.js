const userStatusController = (req, res) => {
  if (req.isAuthenticated()) {
    return res.json(req.user);
  } else {
    return res.send("No user found");
  }
};

module.exports = { userStatusController };
