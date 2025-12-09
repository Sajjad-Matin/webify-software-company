import express from "express";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../controllers/projects.controller.js";
import { upload } from "../middleware/multer.js";
import {protectRoute} from '../middleware/auth.meddleware.js'

const router = express.Router();

router.get("/", getProjects);

router.post("/", protectRoute, upload.single("image"), createProject);

router.put("/:id", protectRoute, upload.single("image"), updateProject);

router.delete("/:id", protectRoute, deleteProject);

export default router;
