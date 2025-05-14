import Teacher from "../models/teacher.model";
import { Op } from "sequelize";

class TeacherController {
    getAllTeachers = async (req, res) => {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;
        try {
            const teachers = await Teacher.findAll({ limit, offset });
            if (!teachers.length) 
                throw new Error("Teachers not found");
            
            return res.status(200).json({
                statusCode: 200,
                error: null,
                message: "Викладачі знайдені!",
                successful: true,
                data: teachers
            });
        } catch (error) {
            return res.status(400).json({
                statusCode: 400,
                error: error.message,
                message: "Помилка при отриманні викладачів!",
                successful: false,
                data: null
            });
        }
    }   

    getAllTeachersByName = async (req, res) => {
        const { full_name } = req.query;
        try{
            const teachers = await Teacher.findAll({
                where: {
                    full_name: {
                    [Op.iLike]: `%${full_name}%`
                  }
                }
            });

            if(!teachers.length)
                throw Error("teachers not found!")
            
            return res.status(200).json({
                statusCode: 200,
                error: null,
                message: "Викладачі знайдені!",
                successful: true,
                data: teachers
            });              
        }catch(error) {
            return res.status(400).json({
                statusCode: 400,
                error: error.message,
                message: "Помилка при отриманні викладачів!",
                successful: false,
                data: null
            });
        }
    }

    createTeacher = async (req, res) => {

        const { full_name, institute, bio, email, phone } = req.body;
        const filePath = req.file ? `${process.env.IP}/uploads/posts/${req.file.filename}` : null;

        try {
            const newTeacher = await Teacher.create({
                full_name,
                filePath,
                institute,
                bio,
                email,
                phone
            });
            
            return res.status(201).json({
                statusCode: 201,
                error: null,
                message: "Викладача додано!",
                successful: true,
                data: newTeacher
            });
        } catch (e) {
            return res.status(400).json({
                statusCode: 400,
                error: e.message,
                message: "Помилка при створенні викладача!",
                successful: false,
                data: null
            });
        }
    }
}

export default TeacherController;