const router = require("express").Router();

const { testController } = require("../../controllers/friendController");

router.get("/test", testController);

module.exports = router;
