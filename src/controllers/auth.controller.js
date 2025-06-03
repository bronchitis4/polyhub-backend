
import pool from '../config/dbConfig.js';
import hashModule from "../utils/hashUtils.js";
import { Mailer } from '../utils/mailer.js';
import {GenerateTokenModule} from '../utils/jwtToken.js';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/user.model.js';
import TemporaryUser from '../models/user_temporary.model.js';
import Role from '../models/role.model.js';
import RefreshToken from '../models/refresh_token.model.js';
import UserProfile from '../models/user_profile.model.js';

class AuthController {
    constructor() {
        this.hashPasswordModule = new hashModule();
        this.mailerModule = new Mailer();
        this.generateTokenModule = new GenerateTokenModule();
    }

    createUserProfile = async (data) => {
        const newProfile = await UserProfile.create(data);
        if(!newProfile) {
            throw Error("Profile not created!")
        }

        console.log("Profile created!");
        return newProfile;
    } 

    regUser = async (req, res) => {
        try {
            const error = validationResult(req);
            if(!error.isEmpty()) {
                console.log(error);
                return res.status(400).json({
                    statusCode: 400,
                    error: "Validation failed", 
                    message: "Введено неправильні дані",
                    successful: false,
                    data: error.array()
                });
            }

            const {first_name, surname, email, password} = req.body;

            const allowedDomains = ['lpnu.ua'];
            const emailDomain = email.split('@')[1];
            if (!allowedDomains.includes(emailDomain)) {
                return res.status(400).json({
                    statusCode: 400,
                    error: "Invalid email domain",
                    message: "Онлі для лапітєхнікав!",
                    successful: false, 
                    data: req.body  
                });
            }
            
            const password_hash = await this.hashPasswordModule.hashPassword(password);
            const data = {
                first_name,
                surname,
                email,
                password_hash
            }

            if ((await User.findOne({ where: { email } })) !== null) {
                return res.json({
                    statusCode: 400,
                    error: "User already exists",
                    message: "Користувач із такою поштою вже зареєстрований",
                    successful: false, 
                    data: req.body      
                });
            }
            
            const generatedCode = this.mailerModule.generateCode();
            //await this.mailerModule.sendVerificationEmail(email, generatedCode);
            //data.verification_code = generatedCode;
            data.verification_code = 1111;

            try {
                const temporaryUser = await TemporaryUser.create(data);
             } catch (error) {
                throw error; 
            }            

            res.status(200).json({
                statusCode: 200,
                error: null, 
                message: "Код підтвердження надіслано на вашу пошту",        
                successful: true, 
                data: req.body }
            );
            
        }catch(e) {
            return res.json({
                statusCode: 400,
                error: "Registration error: " +  e.message,         
                message: "Сталася помилка під час реєстрації",   
                successful: false, 
                data: req.body 
            });
        }
    }

    mailСonfirmation = async (req, res) => {
        try {
            const {email, verificationClientCode} = req.body;
            const userData = await TemporaryUser.findOne({ where: { email } });
            console.log(userData);
            if (userData === null) {
                return res.json({
                    statusCode: 400,
                    error: "User not found",
                    message: "Користувача з такою поштою не знайдено!"
                });
            }
            
            const {first_name, surname, password_hash, verification_code} = userData;
            console.log("Вер код: " + verificationClientCode + "Генер: " + verification_code);
            
            if(verificationClientCode == userData.verification_code)
            {
                const role_id = 1; //user
                const user = await User.create({role_id,first_name, surname, email, password_hash});
                const userProfile = this.createUserProfile({user_id: user.id, avatar_path: "", nickname: `User${user.id}`, bio: null});
                
                await TemporaryUser.destroy({ where: { email } });
        
                const tokens = this.generateTokenModule.generateTokens({id: user.id, email, role: "user"});
                await RefreshToken.create({user_id: user.id, token: tokens.refreshToken, expires_at: tokens.expiresIn});
                
                const expiresDate = Date.now() + 30 * 24 * 60 * 60 * 1000;
                res.cookie('refreshToken', tokens.refreshToken, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'Lax',
                    expires: new Date(expiresDate),
                });

                res.status(200).json({
                    statusCode: 200,
                    error: null,         
                    message: "Вхід у систему успішний",   
                    successful: true,
                    data: {user_id: user.id, role: user.role_id == 1 ? "user" : "admin",
                        accessToken: tokens.accessToken}
                    });
            }else{
                //throw new Error("Invalid verification code");
            }
        }catch(e) {
            console.log(e);
            return res.json({
                statusCode: 400,
                error: "Verification error: " +  e.message,         
                message: "Неправильний код підтвердження",   
                successful: false, 
                data: req.body 
            });     
        }
    }

    logInUser = async (req, res) => {
        try{
            const {email, password} = req.body;
           
            const user = await User.findOne({ where: { email } });
            if(!user){
                return res.status(400).json({
                    statusCode: 400,
                    error: "User not found",
                    message: "Користувача з такою поштою не існує!"
                });
            }

            const passwordIsCorrect = await this.hashPasswordModule.comparePassword(password, user.password_hash);
            if(passwordIsCorrect){
                const tokens = this.generateTokenModule.generateTokens({id: user.id, email, role: "user"});

                await RefreshToken.destroy({where: {user_id: user.id}}); //деліт поточної сесії
                await RefreshToken.create({user_id: user.id, token: tokens.refreshToken, expires_at: tokens.expiresIn});              

                const expiresDate = Date.now() + 30 * 24 * 60 * 60 * 1000;
                res.cookie('refreshToken', tokens.refreshToken, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'Strict',
                    expires: new Date(expiresDate), // 30 днів
                });

                res.status(200).json({
                    statusCode: 200,
                    error: null,         
                    message: "Вхід у систему успішний",   
                    successful: true,
                    data: {user_id: user.id, role: user.role_id == 1 ? "user" : "admin",
                        accessToken: tokens.accessToken}
                    });

            
            }else{
                return res.status(400).json({
                    statusCode: 400,
                    error: "Invalid password",
                    message: "Неправильний пароль!"
                });
            }
        }catch(e) {
            return res.status(400).json({
                statusCode: 400,
                error: "Login error: " + e.message,
                message: "Сталася помилка під час входу. Спробуйте ще раз!"
            });
        } 
    }

    logOutUser = async (req, res) => {
        try {
            const user_id = req.user.id; 
            if(!user_id) {
                return res.status(400).json({
                    statusCode: 400,
                    error: "Refresh token not found",
                    message: "Refresh token не знайдений!"
                });
            }

            await RefreshToken.destroy({where: {user_id}});
            return res.status(200).json({
                statusCode: 200,
                error: null,
                message: "Вихід виконано успішно!",
                successful: true
            });
        }catch(e) {
            return res.status(400).json({
                statusCode: 400,
                error: "Logout error: " + e.message,
                message: "Сталася помилка під час виходу. Спробуйте ще раз!"

            });
        }
    }

    async checkAuth(req, res) {
        try {
            res.status(200).json({ 
                statusCode: 200,
                error: null,
                message: "Авторизація пройшла успішно!",
                role: "user",
                role_name: req.user.role
            })
        }catch(e) {
            return res.json({
                statusCode: 401,
                error: "Token error: " + e.message,
                message: "Користувач не авторизований!"
            })
        }
    }

    refreshToken = async (req, res) => {
        try {
            const { user_id }= req.body;
            const refreshTokenRecord = await RefreshToken.findOne({where:{user_id}});

            const refreshTokenFromClient = refreshTokenRecord.token;
            if (!refreshTokenFromClient) {
                return res.status(400).json({
                    statusCode: 400,
                    error: 'Refresh token not found',
                    message: 'Refresh token не передано.',
                    successful: false,
                    data: null,
                });
            }
    
            // const refreshTokenRecord = await RefreshToken.findOne({
            //     where: {
            //         token: refreshTokenFromClient,
            //         expires_at: {
            //             [Op.gt]: new Date(),
            //         },
            //     },
            // });
    
            // if (!refreshTokenRecord) {
            //     return res.status(401).json({
            //         statusCode: 401,
            //         error: 'Invalid or expired refresh token',
            //         message: 'Refresh token не знайдений або його термін дії вичерпано.',
            //         successful: false,
            //         data: null,
            //     });
            // }
            
            const decoded = jwt.verify(refreshTokenFromClient, process.env.REFRESH_TOKEN_SECRET);
    
            const newAccessToken = jwt.sign(
                {
                    id: decoded.id,
                    email: decoded.email,
                    role_name: decoded.role_name,
                },
                process.env.JWT_SECRET,
                { expiresIn: '1h' } 
            );
    
            const newRefreshToken = jwt.sign(
                {
                    id: decoded.id,
                    email: decoded.email,
                    role_name: decoded.role_name,
                },
                process.env.REFRESH_TOKEN_SECRET, 
                { expiresIn: '7d' } 
            );
    
            const expiresInDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            await RefreshToken.update(
                { token: newRefreshToken, expires_at: expiresInDate },
                { where: { id: refreshTokenRecord.id } }
            );
    
            console.log('Setting new refresh token cookie');
            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                expires: expiresInDate,
            });
    
            return res.status(200).json({
                statusCode: 200,
                error: null,
                message: 'Токени успішно оновлено.',
                successful: true,
                data: {
                    accessToken: newAccessToken,
                    expiresIn: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // Термін дії accessToken
                },
            });
        } catch (err) {
            console.error('Refresh token error:', err);
            return res.status(500).json({
                statusCode: 500,
                error: err.message,
                message: 'Помилка при оновленні токенів.',
                successful: false,
                data: null,
            });
        }
    };
    
}


export default AuthController;