import express from 'express';
import TeactherReview from '../models/teacher_reviews.model.js';
import { checkRole, verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();
const teactherReview = new TeactherReview();

router.get('/', verifyToken, teactherReview.getTeachersReviews);
router.post('/', verifyToken, teactherReview.createTeacherReview);

export default router;
