const router = require("express").Router();
const { userStatusController } = require("../../controllers/userController");

router.get("/", userStatusController);

module.exports = router;
