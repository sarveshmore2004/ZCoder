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

// router.post("/users", createUser);
// router.get("/users", createUser);

// router.get("/users/:id", getUserById);
// router.put("/users/:id", updateUser);
