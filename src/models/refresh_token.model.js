import { DataTypes, Sequelize } from "sequelize";
import sequelize from '../config/db.js';

const RefreshToken = sequelize.define("refresh_tokens", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    token: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: false
});


export default RefreshToken;