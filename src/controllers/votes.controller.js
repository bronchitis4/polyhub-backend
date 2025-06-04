import Vote from '../models/vote.model.js';
import { validationResult } from 'express-validator';

class VotesController {
    createVote = async (req, res) => {
        try {
            const { user_id, comment_id, post_id, vote_type } = req.body;
            
            const whereClause = comment_id
                ? { comment_id, user_id }
                : post_id
                    ? { post_id, user_id }
                    : null;

            if (whereClause) {
                const vote = await Vote.findOne({ where: whereClause });

                if (vote) {
                    if(vote_type != vote.vote_type){
                        const updateVote = await Vote.update({vote_type}, {where: whereClause})
                        return res.status(200).json({
                            statusCode: 200,
                            error: null,
                            message: "Голос оновленно!",
                            successful: true,
                            data: updateVote
                        });
                    }

                    const deleteVote = await Vote.destroy({ where: whereClause });
                    return res.status(200).json({
                        statusCode: 200,
                        error: null,
                        message: "Тогл режим відпрацював!",
                        successful: true,
                        data: deleteVote
                    });
                }
            }

            const newVote = await Vote.create({
                user_id,
                comment_id,
                post_id,
                vote_type
            });
           
            return res.status(200).json({
                statusCode: 200,
                error: null,
                message: "Голосування успішно додано!",
                successful: true,
                data: newVote
            });
        } catch (e) {
            return res.status(400).json({
                statusCode: 400,
                error: e.message,
                message: "Помилка голосування!",
                successful: false,
                data: req.body
            });
        }
    }

    getVotesByPostId = async (req, res) => {
        try {
            const { id } = req.params;

            const votes = await Vote.findAll({ where: { post_id: id } });
            if (!votes.length) throw new Error("Votes not found!");

            const numberOfLikes = (votes.filter(item => item.vote_type == "upvote")).length;
            const numberOfDislikes = (votes.filter(item => item.vote_type == "downvote")).length
            
            return res.status(200).json({
                statusCode: 200,
                error: null,
                message: "Голоси знайдено!",
                successful: true,
                data: [numberOfLikes, numberOfDislikes]
            });
        }catch (e) {
            return res.status(400).json({
                statusCode: 400,
                error: e.message,
                message: "Помилка при отриманні голосів!",
                successful: false,
                data: null
            });
        }
    }

    getVotesByUserId = async (req, res) => {
        try {
            const user_id = req.query.user_id;
            const post_id = req.query.post_id;
            const vote = await Vote.findOne({where: {user_id, post_id}});
            console.log("vote", vote);
            if(!vote)
                throw Error("Vote not founded!");
            
            const data = vote.vote_type == "upvote" ? 1 : -1; 
            res.status(200).json({
                statusCode: 200,
                error: null,
                message: "Голоси знайдено!",
                successful: true,
                data: data
            })
        }catch(e) {
            return res.status(400).json({
                statusCode: 400,
                error: e.message,
                message: "Помилка при отримані голосів!",
                successful: false,
                data: null
            });
        }
    }

    getVotesByCommentId = async (req, res) => {
        try {
            const { id } = req.params;
            const votes = await Vote.findAll({ where: { comment_id: id } });
            if (!votes.length) throw new Error("Votes not found!");

            return res.status(200).json({
                statusCode: 200,
                error: null,
                message: "Голоси знайдено!",
                successful: true,
                data: votes
            });
        }catch (e) {
            return res.status(400).json({
                statusCode: 400,
                error: e.message,
                message: "Помилка при отриманні голосів!",
                successful: false,
                data: null
            });
        }
    }

    getNumVotesByPostId = async (req, res) => {
        const id = req.params.id;

        try{
            const response = await Vote.findAll({where: {post_id: id}});
            if(!response.length)
                throw Error("Votes not found");
           
            const downvotes = response.filter(item => item.vote_type == "downvote");
            const upvotes = response.filter(item => item.vote_type == "upvote");

            // const upvotes = await Vote.count({
            //     where: {
            //         post_id: id,
            //         vote_type: 'upvote'
            // }
            // });

            // const downvotes = await Vote.count({
            //     where: {
            //         post_id: id,
            //         vote_type: 'downvote'
            // }
            // });
            res.status(200).json({
                statusCode: 200,
                error: null,
                message: "Відгуки знайдено!",
                successful: true,
                data: {
                    upvote: upvotes,
                    downvote: downvotes
                }
            })
        }catch(error){
            return res.status(400).json({
                statusCode: 400,
                error: error.message,
                message: "Відгуки не знайдено!",
                successful: false,
                data: {}
            })
        }
    }

    deleteVote = async (req, res) => {
        try {
            const { id } = req.params;
            const deletedVote = await Vote.destroy({ where: { id } });
            if (!deletedVote) throw new Error("Vote not found!");

            return res.status(200).json({
                statusCode: 200,
                error: null,
                message: "Голосування видалено!",
                successful: true,
                data: deletedVote
            });
        } catch (e) {
            return res.status(400).json({
                statusCode: 400,
                error: e.message,
                message: "Помилка при видаленні голосування!",
                successful: false,
                data: null
            });
        }
    }
}

export default VotesController;
