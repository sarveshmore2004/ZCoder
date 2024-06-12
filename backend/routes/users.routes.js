import express from "express";
import { body } from "express-validator";
import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  getNotifications,
  clearNotifications,
} from "../controllers/users.controller.js";
import { sanitizePreservingCodeBlocks } from "../middlewares/sanitizePreservingCodeBlocks.js";

const router = express.Router();

router
  .route("/")
  .get(getUsers)
  .post(
    [body("name").trim(), body("bio").trim(), sanitizePreservingCodeBlocks],
    createUser
  );

router
  .route("/:id")
  .get(getUserById)
  .put(
    [
      body("name").trim(),
      body("bio").optional().trim(),
      sanitizePreservingCodeBlocks,
    ],
    updateUser
  );

router
  .route("/:id/notifications")
  .get(getNotifications)
  .put(clearNotifications);

export default router;
