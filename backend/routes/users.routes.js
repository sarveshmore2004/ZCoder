import express from "express";
import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  getNotifications,
  clearNotifications,
} from "../controllers/users.controller.js";

const router = express.Router();

router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getUserById).put(updateUser);
router.route("/:id/notifications").get(getNotifications).put(clearNotifications);

export default router;

