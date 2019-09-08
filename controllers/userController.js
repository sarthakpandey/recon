const currentUserController = (req, res) => {
  return res.json(req.user);
};

module.exports = { currentUserController };
