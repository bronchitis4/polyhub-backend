import express from 'express';
import InstituteController from '../controllers/institute.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { checkRole } from '../middlewares/verifyToken.js';
import { upload } from '../utils/multerConfig.js';

const router = express.Router();
const instituteController = new InstituteController();

router.get('/', verifyToken, instituteController.getInstitutes);

export default router;
