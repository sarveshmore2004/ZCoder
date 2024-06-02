import express from "express";

import {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
  addCommentToBlogPost,
} from "../controllers/blogposts.controller.js";

const router = express.Router();

// Routes

router.route("/").get(getAllBlogPosts).post(createBlogPost);
// router.post("/", createBlogPost);
// router.get("/", getAllBlogPosts);

router.route("/:id").get(getBlogPostById).put(updateBlogPost).delete(deleteBlogPost);

// router.get("/:id", getBlogPostById);
// router.put("/:id", updateBlogPost);
// router.delete("/:id", deleteBlogPost);

router.post("/:id/comments", addCommentToBlogPost);

export default router;
