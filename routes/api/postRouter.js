const router = require('express').Router();

const { testController } = require("../../controllers/postController");

router.get("/test", testController);

module.exports = router;