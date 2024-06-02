import express from "express";
import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
} from "../controllers/users.controller.js";

const router = express.Router();

router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getUserById).put(updateUser);

export default router;

