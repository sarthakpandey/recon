const router = require("express").Router();

const {
  testController,
  profileByHandleController,
  profileByUserIdController,
  profileAllController,
  profileCurrentPostController,
  profileCurrentGetController
} = require("../../controllers/profileController");

const auth = require('../../controllers/authController').authStatusController;

router.get("/test", testController);

router.get("/handle/:handle", profileByHandleController);

router.get("/user/:user_id", profileByUserIdController);

router.get("/all", profileAllController);

router.get("/", auth, profileCurrentGetController);

router.post("/", auth, profileCurrentPostController);

module.exports = router;
