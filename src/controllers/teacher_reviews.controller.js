import { where } from "sequelize";
import TeacherReview from "../models/teacher_reviews.model";

class TeachersReviewsController {
    createTeacherReview = async (req, res) => {
        let {user_id, teacher_id, content, rating } = req.body;
        rating = Math.min(Math.max(parseInt(rating), 1), 5);

        try{
            const teacherReview = await TeacherReview.create({
                user_id, teacher_id, content, rating
            })
            
            if(!teacherReview)
                throw Error("Create reviews error");

            res.status(201).json({
                statusCode: 200,
                error: null,
                message: "Відгук створено!",
                successful: true,
                data: teacherReview
            });
        }catch(error){
            return res.status(400).json({
                statusCode: 400,
                error: error.message,
                message: "Помилка при створенні відгуку!",
                successful: false,
                data: null
            });

        }
    }

    getTeachersReviews = async (req, res) => {
        const id = parseInt(req.query.id);
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);

        try{
            const teachersReviews = TeacherReview.findAll({where: {teacher_id: id}, limit, offset});
            if(!teachersReviews.length)
                throw Error("Reviews not found");
            
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
                message: "Відгуки не було знайдено!",
                successful: false,
                data: teacherReview
            })
        }
    }
}

export default TeachersReviewsController;