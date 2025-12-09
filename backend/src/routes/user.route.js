import express from 'express'
import { deleteUser, getUsers, updateUser } from '../controllers/user.controller.js';
import {protectRoute} from '../middleware/auth.meddleware.js'

const router = express.Router()

router.get('/', getUsers)

router.put('/:id', protectRoute, updateUser)  

router.delete('/:id', protectRoute, deleteUser)

export default router;