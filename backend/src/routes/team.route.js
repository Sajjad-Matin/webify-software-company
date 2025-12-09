import express from "express";
import {
  addTeamMember,
  deleteTeamMember,
  getTeamMembers,
  updateTeamMember,
} from "../controllers/team.controller.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.get("/", getTeamMembers);

router.post("/", upload.single("image"), addTeamMember);

router.put("/:id", upload.single("image"), updateTeamMember);

router.delete("/:id", deleteTeamMember);

export default router;
