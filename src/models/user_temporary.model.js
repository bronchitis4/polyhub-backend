import { DataTypes, Sequelize } from "sequelize";
import sequelize from '../config/db.js';

const TemporaryUser = sequelize.define('temporary_users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
      verification_code: {
        type: Sequelize.STRING,
        allowNull: false
    },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    }, {
      tableName: 'temporary_users', 
      timestamps: false  
});

export default TemporaryUser;
