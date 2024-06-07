import express from "express";
import {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
  addCommentToBlogPost,
  upvoteBlogPost,
  downvoteBlogPost,
  incrementViews,
  favoriteBlogPost,
  unfavoriteBlogPost,
} from "../controllers/blogposts.controller.js";
import {
  downvoteComment,
  upvoteComment,
} from "../controllers/comments.controller.js";

const router = express.Router();

// Blog Post Routes
router.route("/").get(getAllBlogPosts).post(createBlogPost);
router
  .route("/:id")
  .get(getBlogPostById)
  .put(updateBlogPost)
  .delete(deleteBlogPost);
router.post("/:id/comments", addCommentToBlogPost);
router.put("/:id/upvote", upvoteBlogPost);
router.put("/:id/downvote", downvoteBlogPost);
router.put("/:id/views", incrementViews);
router.put("/:id/favorite", favoriteBlogPost);
router.put("/:id/unfavorite", unfavoriteBlogPost);

// Comment Routes
router.put("/:postId/comments/:commentId/upvote", upvoteComment);
router.put("/:postId/comments/:commentId/downvote", downvoteComment);

export default router;
