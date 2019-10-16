const User = require("../models/User");
const Post = require("../models/Post");

const testController = (req, res) => {
  res.json({
    success: "This route is working"
  });
};

const createPostController = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user._id
    });

    const post = await newPost.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getAllPostsController = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    const myPosts = [];

    for (post of posts) {
      const myPost = JSON.parse(JSON.stringify(post));

      if (
        post.likes
          .map(user => user.toString())
          .indexOf(req.user._id.toString()) !== -1
      ) {
        myPost.currentLiked = true;
      } else {
        myPost.currentLiked = false;
      }

      myPosts.push(myPost);
    }

    res.json(myPosts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getPostByIdController = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ noPost: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ noPost: "Post not found" });
    }

    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const deletePostByIdController = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ noPost: "Post not found" });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ invalid: "User unauthorized for this action" });
    }

    await post.remove();
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ noPost: "Post not found" });
    }

    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const addLikeToPostController = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      post.likes.filter(
        like => like.user.toString() === req.user._id.toString()
      ).length > 0
    ) {
      return res.status(400).json({ status: "Post already liked" });
    }

    post.likes.unshift({ user: req.user._id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ noPost: "Post not found" });
    }

    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const removeLikeFromPostController = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      post.likes.filter(
        like => like.user.toString() === req.user._id.toString()
      ).length === 0
    ) {
      return res.status(400).json({ status: "Post has not been liked" });
    }

    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user._id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);

    await post.save();
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ noPost: "Post not found" });
    }

    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const addCommentToPostController = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    const post = await Post.findById(req.params.id);

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user._id
    };

    post.comments.unshift(newComment);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ noPost: "Post not found" });
    }

    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const removeCommentFromPostController = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    if (!comment) {
      return res.status(404).json({ notExist: "Comment does not exist" });
    }

    if (comment.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ invalid: "User unauthorized for this action" });
    }

    const removeIndex = post.comments
      .map(comment => comment.id)
      .indexOf(req.params.comment_id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ noPost: "Post not found" });
    }

    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  testController,
  createPostController,
  getAllPostsController,
  getPostByIdController,
  deletePostByIdController,
  addLikeToPostController,
  removeLikeFromPostController,
  addCommentToPostController,
  removeCommentFromPostController
};
