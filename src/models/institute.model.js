import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Institute = sequelize.define("institutes", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    }
},
{
    tableName: 'institutes',
    timestamps: true,
    createdAt: 'created_at', 
    updatedAt: 'updated_at'
})

export default Institute;