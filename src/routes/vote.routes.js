import express from 'express';
import VotesController from '../controllers/votes.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
const router = express.Router();
const votesController = new VotesController();

router.post('/', verifyToken, votesController.createVote);
router.get('/:id/postVotes', verifyToken, votesController.getVotesByPostId);
router.get('/:id/commentVotes', verifyToken, votesController.getVotesByCommentId);

export default router;
