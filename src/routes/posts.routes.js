import express from 'express';
import PostsController from '../controllers/posts.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { checkRole } from '../middlewares/verifyToken.js';
import { upload } from '../utils/multerConfig.js';

const router = express.Router();
const postsController = new PostsController();

router.post('/', verifyToken, checkRole("user"), upload.single('image'), postsController.createPost);
router.get('/', verifyToken, postsController.getAllPosts);
router.get('/:id', verifyToken, postsController.getPostById);
router.put('/posts/:id', verifyToken, verifyToken, postsController.updatePost);
router.delete('/posts/:id', verifyToken, postsController.destroyPostById);

export default router;
