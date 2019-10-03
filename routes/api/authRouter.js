const router = require("express").Router();
const {
  registerController,
  loginController,
  logoutController,
  authStatusController,
  authCheckController
} = require("../../controllers/authController");

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/logout", authCheckController, logoutController);
router.get("/status", authStatusController);
module.exports = router;
