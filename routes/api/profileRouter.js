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

const auth = require("../../controllers/authController").authCheckController;

router.get("/test", testController);

router.get("/handle/:handle", profileByHandleController);

router.get("/user/:user_id", auth, profileByUserIdController);

router.get("/all", auth, profileAllController);

router.get("/", auth, profileCurrentGetController);

router.post("/", auth, profileCurrentPostController);

router.delete("/", auth, deleteAccountController);

router.post("/experience", auth, experiencePostController);

router.post("/education", auth, educationPostController);

router.delete("/experience/:exp_id", auth, experienceDeleteController);

router.delete("/education/:edu_id", auth, educationDeleteController);

module.exports = router;
