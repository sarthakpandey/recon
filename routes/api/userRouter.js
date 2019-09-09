const router = require("express").Router();

const {
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
} = require("../../controllers/userController");

const auth = require("../../controllers/authController").authStatusController;

router.get("/me", auth, currentUserController);

router.get("/sent", auth, getRequestSentController);

router.get("/recieved", auth, getRequestRecievedController);

router.get("/people", auth, getConnectedPeopleController);

router.get("/recon", auth, getRecommendedController);

router.post("/send/:id", auth, sendRequestController);

router.delete("/unsend/:rec_id", auth, unsendRequestController);

router.post("/accept/:sender_id", auth, acceptRequestController);

router.delete("/ignore/:sender_id", auth, ignoreRequestController);

router.get("/isFriend/:id", auth, isFriendController);

module.exports = router;
