
import { DataTypes, Sequelize } from "sequelize";
import sequelize from '../config/db.js'

const Role = sequelize.define('roles', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role_name: {
        type: DataTypes.STRING,
        allowNull: false
    }   
});

export default Role;
