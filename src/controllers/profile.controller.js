// File: src/controllers/profile.controller.js
import UserProfile from "../models/user_profile.model.js";
import User from "../models/user.model.js";
import { validationResult } from "express-validator";

class ProfileController {
   updateProfile = async (req, res) => {
        const id = req.params.id;
        const {nickname, bio} = req.body;
        try{
            const filePath = req.file ? `${process.env.IP}/uploads/avatars/${req.file.filename}` : null;
            const updateProfile = await UserProfile.update(
                { bio, avatart_path: filePath, nickname },
                { where: { user_id:id } } 
            );
           
            if (updateProfile.length === 0) {
                return res.status(404).json({
                    statusCode: 404,
                    error: "Profile not found or no changes made",
                    message: "Профіль не знайдено або не оновлено",
                    successful: false,
                    data: []
                });
            }

            return res.status(200).json({
                statusCode: 200,
                error: null,
                message: "Профіль успішно оновлено!",
                successful: true,
                data: updatedProfile
            });
        }catch(e){
            return res.status(500).json({
                statusCode: 500,
                error: e.message,
                message: "Помилка оновлення профілю!",
                successful: false,
                data: []
            });
        }
   }
    getProfileById = async (req, res) => {
        const id = req.params.id;
        try{
            const profileData = await UserProfile.findOne({
                where: { user_id: id },
                include: [
                    {
                        model: User,
                        attributes: ['email', 'first_name', 'surname']
                    }
                ]
            });
            
            if(!profileData) 
                throw Error("Profile not found");

            res.status(200).json({
                statusCode: 200,
                error: null,
                message: "Профіль знайдено!",
                successful: true,
                data: profileData
            })
        }catch(e) {
            return res.status(500).json({
                statusCode: 500,
                error: e.message,
                message: "Помилка знаходження профілю!",
                successful: false,
                data: []
            })
        }
    }
}

export default ProfileController;