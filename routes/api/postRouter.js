const router = require("express").Router();

const {
  testController,
  createPostController,
  getAllPostsController,
  getPostByIdController,
  deletePostByIdController,
  addLikeToPostController,
  removeLikeFromPostController,
  addCommentToPostController,
  removeCommentFromPostController
} = require("../../controllers/postController");

const auth = require("../../controllers/authController").authStatusController;

router.get("/test", testController);

router.post("/", auth, createPostController);

router.get("/", auth, getAllPostsController);

router.get("/:id", auth, getPostByIdController);

router.delete("/:id", auth, deletePostByIdController);

router.put("/like/:id", auth, addLikeToPostController);

router.put("/unlike/:id", auth, removeLikeFromPostController);

router.post("/comment/:id", auth, addCommentToPostController);

router.delete(
  "/comment/:id/:comment_id",
  auth,
  removeCommentFromPostController
);

module.exports = router;
