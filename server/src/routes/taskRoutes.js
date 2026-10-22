import express from "express";
import { generateTasks } from "../controllers/taskController.js";

const router = express.Router();
router.post("/extract", generateTasks);

export default router;
