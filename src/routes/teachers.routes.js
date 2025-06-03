import express from 'express';
import TeacherController from '../controllers/teachers.controller.js';
import { checkRole, verifyToken } from '../middlewares/verifyToken.js';
import { upload } from '../utils/multerConfig.js';

const router = express.Router();
const teacherController = new TeacherController();

router.get('/', verifyToken, teacherController.getAllTeachers);
router.post('/', verifyToken, checkRole("user"), upload.single('file'), teacherController.createTeacher);
router.get('/search', verifyToken, teacherController.getAllTeachersByName)

export default router;
