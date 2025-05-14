import express from 'express';
import AuthController from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { check } from 'express-validator';

const router = express.Router();
const authController = new AuthController();

router.post('/register', [
    check("first_name", "Поле з іменем пусте!").notEmpty(),
    check("surname", "Поле з прізвищем пусте!").notEmpty(),
    check("email", "Введіть валідний адрес пошти!").isEmail(),
    check("password", "Пароль повинен бути не менше 8 символів!").isLength({min: 8, max: 255})
], authController.regUser);
router.post('/login', authController.logInUser);
router.post('/logout', verifyToken, authController.logOutUser);
router.post('/ver', authController.mailСonfirmation);
router.get('/check-auth', verifyToken, authController.checkAuth);
router.post('/refresh', authController.refreshToken);

export default router;