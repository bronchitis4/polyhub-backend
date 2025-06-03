
import express from 'express';
import CategoriesController from '../controllers/categories.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();
const categoriesController = new CategoriesController();

router.get('/', verifyToken, categoriesController.getAllCategories);         

export default router;