import sequelize from "../config/db.js"
import { DataTypes } from "sequelize";

const Comment = sequelize.define('comments', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'posts',
            key: 'id'
        }
    },
    comment_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'comments',
            key: 'id'
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},
{
    tableName: 'comments',
    timestamps: true,
    createdAt: 'created_at', 
    updatedAt: 'updated_at'

})

export default Comment