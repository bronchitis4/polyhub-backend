// models/category.js

import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Category = sequelize.define('categories', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'categories',
    timestamps: false
});

export default Category;
