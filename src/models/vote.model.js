import { DataTypes, Sequelize } from "sequelize";
import sequelize from '../config/db.js'

const Vote = sequelize.define('votes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    comment_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    user_id: {
        type:DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    vote_type: {
        type: DataTypes.ENUM('upvote', 'downvote'),
        allowNull: false
    }
}, {
    tableName: 'votes',
    timestamps: true,
    createdAt: 'created_at', 
    updatedAt: 'updated_at'
});

export default Vote;
