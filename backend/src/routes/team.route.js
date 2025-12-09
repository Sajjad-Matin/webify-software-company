import express from "express";
import {
  addTeamMember,
  deleteTeamMember,
  getTeamMembers,
  updateTeamMember,
} from "../controllers/team.controller.js";
import { upload } from "../middleware/multer.js";
import { protectRoute } from "../middleware/auth.meddleware.js";

const router = express.Router();

router.get("/", getTeamMembers);

router.post("/", protectRoute, upload.single("image"), addTeamMember);

router.put("/:id", protectRoute, upload.single("image"), updateTeamMember);

router.delete("/:id", protectRoute, deleteTeamMember);

export default router;
