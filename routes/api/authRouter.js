const router = require("express").Router();
const {
  registerController,
  loginController,
  logoutController,
  authStatusController
} = require("../../controllers/authController");

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/logout", authStatusController, logoutController);
router.get("/status", authStatusController);
module.exports = router;
