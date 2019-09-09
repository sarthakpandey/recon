const User = require("../models/User");

const currentUserController = (req, res) => {
  return res.json(req.user);
};

const getRequestSentController = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json(user.reqSent);
  } catch (err) {
    res.json({ err });
  }
};

const getRequestRecievedController = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json(user.reqRecieved);
  } catch (err) {
    res.json({ err });
  }
};

const getConnectedPeopleController = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json(user.connectedPeople);
  } catch (err) {
    res.json({ err });
  }
};

const getRecommendedController = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json(user.recon);
  } catch (err) {
    res.json({ err });
  }
};

const sendRequestController = async (req, res) => {
  try {
    const rec_id = req.params.id;

    if (rec_id.toString() === req.user._id.toString()) {
      return res.json({ invalid: "Invalid action" });
    }

    const sender = await User.findById(req.user._id);
    const reciever = await User.findById(rec_id);

    const idx = sender.reqSent
      .map(item => item.user.toString())
      .indexOf(rec_id.toString());

    if (idx !== -1) {
      return res.json({ invalid: "Already sent" });
    }

    const senderMini = {
      user: req.user._id,
      name: sender.name,
      avatar: sender.avatar
    };

    const recieverMini = {
      user: rec_id,
      name: reciever.name,
      avatar: reciever.avatar
    };

    sender.reqSent.unshift(recieverMini);
    reciever.reqRecieved.unshift(senderMini);

    await sender.save();

    await reciever.save();

    res.json(sender.reqSent);
  } catch (err) {
    res.json({ err });
  }
};

const unsendRequestController = async (req, res) => {
  try {
    const rec_id = req.params.rec_id;

    if (rec_id.toString() === req.user._id.toString()) {
      return res.json({ invalid: "Invalid action" });
    }

    const sender = await User.findById(req.user._id);
    const reciever = await User.findById(rec_id);

    const idx = sender.reqSent
      .map(item => item.user.toString())
      .indexOf(rec_id.toString());

    const recieverIdx = reciever.reqRecieved
      .map(item => item.user.toString())
      .indexOf(req.user._id.toString());

    if (idx === -1 || recieverIdx === -1) {
      return res.json({ invalid: "Request not yet sent" });
    }

    sender.reqSent.splice(idx, 1);
    reciever.reqRecieved.splice(recieverIdx, 1);

    await sender.save();

    await reciever.save();

    res.json(sender.reqSent);
  } catch (err) {
    res.json({ err });
  }
};

const acceptRequestController = async (req, res) => {
  try {
    const acceptor_id = req.user._id;

    const sender_id = req.params.sender_id;

    if (acceptor_id.toString() === sender_id.toString()) {
      return res.json({ invalid: "Invalid action" });
    }

    const acceptor = await User.findById(acceptor_id);

    const sender = await User.findById(sender_id);

    const acceptorIdx = acceptor.reqRecieved
      .map(item => item.user.toString())
      .indexOf(sender_id.toString());

    const senderIdx = sender.reqSent
      .map(item => item.user.toString())
      .indexOf(acceptor_id.toString());

    if (acceptorIdx === -1 || senderIdx === -1) {
      return res.json({ invalid: "Invalid action" });
    }

    acceptor.reqRecieved.splice(acceptorIdx, 1);

    sender.reqSent.splice(senderIdx, 1);

    acceptor.connectedPeople.unshift({
      user: sender_id,
      name: sender.name,
      avatar: sender.avatar
    });

    sender.connectedPeople.unshift({
      user: acceptor_id,
      name: acceptor.name,
      avatar: acceptor.avatar
    });

    await acceptor.save();
    await sender.save();

    res.json(acceptor.connectedPeople);
  } catch (err) {
    res.json({ err });
  }
};

const ignoreRequestController = async (req, res) => {
  try {
    const ignorer_id = req.user._id;

    const sender_id = req.params.sender_id;

    if (ignorer_id.toString() === sender_id.toString()) {
      return res.json({ invalid: "Invalid action" });
    }

    const ignorer = await User.findById(ignorer_id);

    const sender = await User.findById(sender_id);

    const ignorerIdx = ignorer.reqRecieved
      .map(item => item.user.toString())
      .indexOf(sender_id.toString());

    const senderIdx = sender.reqSent
      .map(item => item.user.toString())
      .indexOf(ignorer_id.toString());

    if (ignorerIdx === -1 || senderIdx === -1) {
      return res.json({ invalid: "Invalid action" });
    }

    ignorer.reqRecieved.splice(ignorerIdx, 1);

    sender.reqSent.splice(senderIdx, 1);

    await ignorer.save();
    await sender.save();

    res.json(ignorer.reqRecieved);
  } catch (err) {
    res.json({ err });
  }
};

const isFriendController = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(req.user._id);

    const idx = user.connectedPeople
      .map(item => item.user.toString())
      .indexOf(id.toString());

    if (idx === -1) {
      return res.json({ isFriend: false });
    } else {
      return res.json({ isFriend: true });
    }
  } catch (err) {
    res.json({ err });
  }
};

module.exports = {
  currentUserController,
  getRequestSentController,
  getRequestRecievedController,
  getConnectedPeopleController,
  getRecommendedController,
  sendRequestController,
  unsendRequestController,
  acceptRequestController,
  ignoreRequestController,
  isFriendController
};
