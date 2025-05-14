import Comment from "../models/comment.model.js";

class CommentsController {
    createComment = async (req, res) => {
        const { user_id, post_id, comment_id, content } = req.body;
        try {
            const newComment = await Comment.create({ post_id, comment_id, content, user_id });
            if (!newComment) throw Error("Error create comment!");

            res.status(200).json({
                statusCode: 200,
                error: null,
                message: "Коментар додано успішно",
                successful: true,
                data: newComment
            });
        } catch (e) {
            return res.status(400).json({
                statusCode: 400,
                error: e.message,
                message: "Помилка при додаванні коменаря!",
                successful: false,
                data: null
            });
        }
    }

    updateCommentById = async (req, res) => {
        const comment_id = req.params.id;
        const { content } = req.body;
        try {
            const updatedCount = await Comment.update({ content }, { where: { id: comment_id } });
            if (!updatedCount) throw Error("Error update comment!");

            res.status(200).json({
                statusCode: 200,
                error: null,
                message: "Коментар відредаговано успішно!",
                successful: true,
                data: { updatedCount }
            });
        } catch (e) {
            return res.status(400).json({
                statusCode: 400,
                error: e.message,
                message: "Помилка при редагуванні коментаря!",
                successful: false,
                data: null
            });
        }
    }

    getCommentsByPostId = async (req, res) => {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;
        const post_id = req.params.postId;

        try {
            const commentsList = await Comment.findAll({ where: { post_id }, limit, offset });
            if (!commentsList.length) throw Error("Comments not found!");

            res.status(200).json({
                statusCode: 200,
                error: null,
                message: "Коментарі знайдено!",
                successful: true,
                data: commentsList
            });
        } catch (e) {
            return res.status(400).json({
                statusCode: 400,
                error: e.message,
                message: "Помилка при пошуку коментарів!",
                successful: false,
                data: []
            });
        }
    }

    getReplyByCommentId = async (req, res) => {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;
        const comment_id = req.params.id;

        try {
            const replyList = await Comment.findAll({ where: { comment_id }, limit, offset });
            if (!replyList.length) throw Error("Replies not found!");

            res.status(200).json({
                statusCode: 200,
                error: null,
                message: "Відповіді знайдено!",
                successful: true,
                data: replyList
            });
        } catch (e) {
            return res.status(400).json({
                statusCode: 400,
                error: e.message,
                message: "Помилка у пошуку відповідей!",
                successful: false,
                data: []
            });
        }
    }

    deleteCommentById = async (req, res) => {
        const id = req.params.id;
        try {
            const deletedCount = await Comment.destroy({ where: { id } });

            if (!deletedCount) throw Error("Comment not found!");

            res.status(200).json({
                statusCode: 200,
                error: null,
                message: "Коментар успішно видалено!",
                successful: true,
                data: { numDeleted: deletedCount }
            });
        } catch (e) {
            return res.status(400).json({
                statusCode: 400,
                error: e.message,
                message: "Помилка при видаленні коментаря!",
                successful: false,
                data: null
            });
        }
    }
}

export default CommentsController;
