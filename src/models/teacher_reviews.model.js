import sequelize from "../config/db";
import { DataTypes } from "sequelize";

const TeacherReview = sequelize.define('teachers_reviews', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    teacher_id: {
        type: DataTypes.INTEGER,
        references: {
            model:'teachers',
            key: 'id'
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model:'users',
            key: 'id'
        }
    },
    content: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rating: {
        type: DataTypes.INTEGER,
        validate:{
            min: 1,
            max: 5
        }
    }},
    {
        tableName: 'teachers',
        timestamps: true
    }
)

export default TeacherReview;