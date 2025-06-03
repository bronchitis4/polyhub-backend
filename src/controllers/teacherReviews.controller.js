import { where } from "sequelize";
import TeacherReview from "../models/teacher_reviews.model.js"


class TeacherReviewsController {
    getReviesByTeacherId = async (req, res) => {
        const {teacher_id} = req.params.id;
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);
        
        try {
            const teacherReviews = await TeacherReview.findAll({where: {teacher_id}, limit, offset})
            if(!teacherReviews.length)
                throw new Error('TeacherReviews not found');
            
            res.status(200).json({
                statusCode: 200,
                error: null,
                message: "Відгуки знайдено!",
                successful: true,
                data: teacherReview
            })
        }catch(error) {
            return res.status(500).json({
                statusCode: 200,
                error: error.message,
                message: "Відгуки не знайдено!",
                successful: false,
                data: []
            })
        }
    }

    createTeacherReview = async (req, res) => {
        const {teacher_id, content, rating} = req.body;
        const user_id = req.user.id;
        
        try{
            const newTeacherReview = await TeacherReview.create({
                teacher_id,
                user_id,
                content,
                rating
            }) 

            if(!newTeacherReview)
                throw new Error("Error create review");
            
            res.status(201).json({
                statusCode: 201,
                error: null,
                message: "Відгуки створено!",
                successful: true,
                data: teacherReview
            })

        } catch(error) {
             return res.status(400).json({
                statusCode: 400,
                error: error.message,
                message: "Не вдалось створити відгук!",
                successful: false,
                data: {}
            })
        }
    }

    deleteTeacherReviewById = async (req, res) => {
        const { id } = req.params;
        const user_id = req.user.id;

        try {
            const review = await TeacherReview.findByPk(id);
            if (!review)
                throw new Error("Not found review");
                
            if (review.user_id !== user_id && req.user.role != "admin") {
                return res.status(403).json({
                    statusCode: 403,
                    error: "No permission",
                    message: "Тільки автор може видалити відгук",
                    successful: false,
                    data: {}
                });
            }
            await review.destroy();

            res.status(200).json({
                statusCode: 200,
                error: null,
                message: "Відгук успішно видалено!",
                successful: true,
                data: {}
            });

        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                error: error.message,
                message: "Помилка при видаленні відгуку!",
                successful: false,
                data: {}
            });
        }
    }

    updateTeacherReviewById = async (req, res) => {
        const { id } = req.params;
        const user_id = req.user.id;
        const { content, rating } = req.body;

        try {
            const review = await TeacherReview.findByPk(id);

            if (!review)
                throw new Error("Not found review");


            if (review.user_id !== user_id && req.user.role != 'admin') {
                return res.status(403).json({
                    statusCode: 403,
                    error: "No permission",
                    message: "Тільки автор може оновити відгук.",
                    successful: false,
                    data: {}
                });
            }

            await TeacherReview.update(
                { content, rating },
                { where: { id } }
            );

            const updatedReview = await TeacherReview.findByPk(id);

            res.status(200).json({
                statusCode: 200,
                error: null,
                message: "Відгук успішно оновлено!",
                successful: true,
                data: updatedReview
            });

        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                error: error.message,
                message: "Помилка при оновленні відгуку!",
                successful: false,
                data: {}
            });
        }
    };

}

export default TeacherReviewsController;