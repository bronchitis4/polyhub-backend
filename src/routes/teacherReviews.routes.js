import express from 'express';
import TeacherReviewsController from '../controllers/teacherReviews.controller.js';
import { checkRole, verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();
const teacherReviewsController = new TeacherReviewsController();

router.get('/:id', verifyToken, teacherReviewsController.getReviesByTeacherId);
router.post('/', verifyToken, teacherReviewsController.createTeacherReview);
router.put('/:id', verifyToken, teacherReviewsController.updateTeacherReviewById)
router.delete('/:id', verifyToken, teacherReviewsController.deleteTeacherReviewById)

export default router;
