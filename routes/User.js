import express from "express";
import {
  getTasks,
  getTask,
  postTask,
  putTask,
  deleteTask
} from "../controllers/task.Controllers.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getTasks);
router.get("/:taskId", verifyToken, getTask);
router.post("/", verifyToken, postTask);
router.put("/:taskId", verifyToken, putTask);
router.delete("/:taskId", verifyToken, deleteTask);

export default router;