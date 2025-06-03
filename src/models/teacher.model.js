import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Institute from "./institute.model.js";

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
  image_url: {
    type: DataTypes.TEXT
  },
  institute_id: {
    type: DataTypes.INTEGER,
    reference: {
      model: 'institutes',
      key: 'id'
    }
  },
  bio: {
    type: DataTypes.TEXT
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true
    }
  }
}, {
  tableName: "teachers",
  timestamps: true,
  createdAt: 'createdat', 
  updatedAt: 'updatedat'
  
});

Teacher.belongsTo(Institute, { foreignKey: "institute_id" });

export default Teacher;
