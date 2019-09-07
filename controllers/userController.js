const currentUserController = (req, res) => {
  if (req.isAuthenticated()) {
    return res.json(req.user);
  } else {
    return res.send("Log in first");
  }
};

module.exports = { currentUserController };
