import { validationResult } from 'express-validator';
import Post from '../models/post.model.js';
import { where } from 'sequelize';

class PostsController {
    createPost = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    statusCode: 400,
                    error: "Validation failed",
                    message: "Не всі поля заповнені",
                    successful: false,
                    data: []
                });
            }

            const { user_id, title, content, category_id } = req.body;
            const filePath = req.file ? `${process.env.IP}/uploads/teachers/${req.file.filename}` : null;

            const newPost = await Post.create({
                user_id,
                title,
                imageurl: filePath,
                content,
                category_id
            });

            res.status(200).json({
                statusCode: 200,
                error: null,
                message: "Пост додано!",
                successful: true,
                data: newPost
            });

        } catch (e) {
            return res.status(400).json({
                statusCode: 400,
                error: e.message,
                message: "Не вдалося створити пост, спробуйте пізніше!",
                successful: false,
                data: req.body
            });
        }
    }

    getPostById = async (req, res) => {
        const { id } = req.params;
        try {
            const postById = await Post.findOne({ where: { id } });
            if (!postById) throw new Error("Post is not defined.");

            res.status(200).json({
                statusCode: 200,
                error: null,
                message: "Пост знайдено!",
                successful: true,
                data: postById
            });
        } catch (e) {
            return res.json({
                statusCode: 400,
                error: e.message,
                message: "Поста не знайдено!",
                successful: false,
                data: req.body
            });
        }
    }

    getAllPostsByUserId = async (req, res) => {
        const { user_id } = req.params;
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;

        try {
            const posts = await Post.findAll({
                where: { user_id },
                limit,
                offset });
            res.status(200).json({
                statusCode: 200,
                error: null,
                message: "Пости знайдено!",
                successful: true,
                data: posts
            });
        } catch (e) {
            return res.status(500).json({
                statusCode: 500,
                error: e.message,
                message: "Помилка",
                successful: false, 
                data: null
            });
        }
    };

    // getAllPosts = async (req, res) => {
    //     const limit = parseInt(req.query.limit) || 10;
    //     const offset = parseInt(req.query.offset) || 0;
    
    //     try {
    //         const posts = await Post.findAll({
    //             limit,
    //             offset
    //         });
    
    //         res.status(200).json({
    //             statusCode: 200,
    //             error: null,
    //             message: "Пости знайдено!",
    //             successful: true,
    //             data: posts
    //         });
    //     } catch (e) {
    //         return res.status(500).json({
    //             statusCode: 500,
    //             error: e.message,
    //             message: "Помилка",
    //             successful: false,
    //             data: null
    //         });
    //     }
    // };
     

    // getAllPostsByCategory = async (req, res) => {
    //     const limit = req.query.limit || 10;
    //     const offset = req.query.offset || 0;
    //     const category_id = req.query.category_id || 1;

    //     console.log('Запит:', { category_id, limit, offset });

    //     try {
    //         const posts = await Post.findAll({ where: { category_id }, limit, offset });
    //         console.log(...posts);
    //         res.status(200).json({
    //             statusCode: 200,
    //             error: null,
    //             message: "Пости знайдено!",
    //             successful: true,
    //             data: posts
    //         });
    //     } catch (e) {
    //         return res.status(500).json({
    //             statusCode: 500,
    //             error: e.message,
    //             message: "Помилка",
    //             successful: false,
    //             data: null
    //         });
    //     }
    // }

    getAllPosts = async (req, res) => {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;
        const category_id = req.query.category_id;
    
        const where = {};
        if (category_id) {
            where.category_id = category_id;
        }
    
        console.log('Запит:', { category_id, limit, offset });
    
        try {
            const posts = await Post.findAll({ where, limit, offset });
    
            res.status(200).json({
                statusCode: 200,
                error: null,
                message: "Пости знайдено!",
                successful: true,
                data: posts
            });
        } catch (e) {
            return res.status(500).json({
                statusCode: 500,
                error: e.message,
                message: "Помилка",
                successful: false,
                data: null
            });
        }
    };
    

    updatePost = async (req, res) => {
        const { id } = req.params;
        const { user_id, title, content, category_id } = req.body;

        try {
            const post = await Post.findOne({ where: { id } });
            if (!post || post.user_id !== user_id) {
                throw Error("Post not found! Incorrect user_id");
            }

            await Post.update({ title, content, category_id }, { where: { id } });

            res.status(200).json({
                statusCode: 200,
                error: null,
                message: "Пост змінено!",
                successful: true,
                data: null
            });
        } catch (e) {
            return res.status(500).json({
                statusCode: 500,
                error: e.message,
                message: "Помилка",
                successful: false,
                data: null
            });
        }
    }

    destroyPostById = async (req, res) => {
        const { id } = req.params;
        const { user_id } = req.body;

        try {
            const post = await Post.findOne({ where: { id } });
            if (!post || post.user_id !== user_id) {
                throw Error("Post not found! No access to delete this post");
            }

            const postDestroyed = await Post.destroy({ where: { id } });
            res.status(200).json({
                statusCode: 200,
                error: null,
                message: "Пост успішно видалено!",
                successful: true,
                data: postDestroyed
            });
        } catch (e) {
            return res.status(500).json({
                statusCode: 500,
                error: e.message,
                message: "Помилка",
                successful: false,
                data: null
            });
        }
    }
}

export default PostsController;