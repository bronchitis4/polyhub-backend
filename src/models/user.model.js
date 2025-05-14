import { DataTypes, Sequelize } from "sequelize";
import sequelize from '../config/db.js'
import { types } from "pg";

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      role_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'roles',
          key: 'id' 
        }
      },
      first_name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      surname: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    }, {
      tableName: 'users',  
      timestamps: false  
});

export default User;
