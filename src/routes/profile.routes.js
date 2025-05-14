import express from 'express';
import ProfileController from '../controllers/profile.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();
const profileController = new ProfileController();

router.get('/:id', verifyToken, profileController.getProfileById);
router.put('/:id', verifyToken, profileController.updateProfile)
export default router;
