const router = require("express").Router();

const { currentUserController } = require("../../controllers/userController");

const auth = require('../../controllers/authController').authStatusController;

router.get("/me", auth, currentUserController);

module.exports = router;
