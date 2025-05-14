import { DataTypes, Sequelize } from "sequelize";
import sequelize from '../config/db.js';
import User from "./user.model.js";

const UserProfile = sequelize.define('user_profiles', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'id'
        }
    }, 
    avatar_path: {
        type: DataTypes.STRING(255),
        default: null,
        allowNull: true
    },
    nickname: {
        type: DataTypes.STRING(),
        unique: true
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true
    }},  
    {
        tableName: 'user_profiles',
        timestamps: false 
    }
)

UserProfile.belongsTo(User, { foreignKey: 'user_id' });


export default UserProfile;