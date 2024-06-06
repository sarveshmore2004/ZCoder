import express from "express";

import {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
  addCommentToBlogPost,
  upvoteBlogPost,
  downvoteBlogPost
} from "../controllers/blogposts.controller.js";

const router = express.Router();

// Routes
router.route("/").get(getAllBlogPosts).post(createBlogPost);
router.route("/:id").get(getBlogPostById).put(updateBlogPost).delete(deleteBlogPost);
router.post("/:id/comments", addCommentToBlogPost);
router.put("/:id/upvote", upvoteBlogPost);
router.put("/:id/downvote", downvoteBlogPost);

export default router;
