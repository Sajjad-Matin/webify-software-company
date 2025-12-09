import express from "express";
import { createMessage, getMessages, deleteMessage } from "../controllers/message.controller.js";
import {protectRoute} from '../middleware/auth.meddleware.js'

const router = express.Router();

router.get("/", protectRoute, getMessages);

router.post("/", createMessage);

router.delete('/:id', protectRoute, deleteMessage);

export default router;