
import express from 'express';
import CommentsController from '../controllers/comments.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { check } from 'express-validator';

const router = express.Router();
const commentsController = new CommentsController();

router.post('/', verifyToken, commentsController.createComment);                         
router.put('/:id', verifyToken, commentsController.updateCommentById);                    
router.get('/post/:postId', verifyToken, commentsController.getCommentsByPostId);         
router.get('/:commentId/replies', verifyToken, commentsController.getReplyByCommentId);  

export default router;