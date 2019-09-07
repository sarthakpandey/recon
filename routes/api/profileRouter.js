const router = require("express").Router();

const {
  testController,
  profileByHandleController,
  profileByUserIdController,
  profileAllController,
  profileCurrentPostController,
  profileCurrentGetController,
  deleteAccountController,
  experiencePostController,
  educationPostController,
  experienceDeleteController,
  educationDeleteController
} = require("../../controllers/profileController");

const auth = require("../../controllers/authController").authStatusController;

router.get("/test", testController);

router.get("/handle/:handle", profileByHandleController);

router.get("/user/:user_id", profileByUserIdController);

router.get("/all", profileAllController);

router.get("/", auth, profileCurrentGetController);

router.post("/", auth, profileCurrentPostController);

router.delete("/", auth, deleteAccountController);

router.post("/experience", auth, experiencePostController);

router.post("/eductaion", auth, educationPostController);

router.delete("/experience/:exp_id", auth, experienceDeleteController);

router.delete("/education/:edu_id", auth, educationDeleteController);

module.exports = router;
