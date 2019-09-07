const router = require("express").Router();
const { currentUserController } = require("../../controllers/userController");

router.get("/me", currentUserController);

module.exports = router;
