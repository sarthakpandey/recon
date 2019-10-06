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
  checkFriendController,
  getAllUsersController
} = require("../../controllers/userController");

const auth = require("../../controllers/authController").authCheckController;

router.get("/me", auth, currentUserController);

router.get("/list", auth, getAllUsersController);

router.get("/sent", auth, getRequestSentController);

router.get("/recieved", auth, getRequestRecievedController);

router.get("/people", auth, getConnectedPeopleController);

router.get("/recon", auth, getRecommendedController);

router.post("/send/:id", auth, sendRequestController);

router.delete("/unsend/:rec_id", auth, unsendRequestController);

router.post("/accept/:sender_id", auth, acceptRequestController);

router.delete("/ignore/:sender_id", auth, ignoreRequestController);

router.get("/check/:id", auth, checkFriendController);

module.exports = router;
