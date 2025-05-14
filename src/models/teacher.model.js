import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Teacher = sequelize.define("teachers", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  full_name: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.TEXT
  },
  institute: {
    type: DataTypes.STRING(100)
  },
  bio: {
    type: DataTypes.TEXT
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING
  },
  
}, {
  tableName: "teachers",
  timestamps: true
});

export default Teacher;
