import express from 'express';
import TeacherController from '../controllers/teachers.controller.js';
import { checkRole, verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();
const teacherController = new TeacherController();

router.get('/', verifyToken, teacherController.getAllTeachers);
router.post('/', verifyToken, checkRole("admin"), teacherController.createTeacher);
router.get('/search', verifyToken, teacherController.getAllTeachersByName)

export default router;
