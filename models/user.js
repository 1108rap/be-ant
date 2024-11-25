const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = require("../config/db");

const sequelize = new Sequelize("antisme", "postgres", "0000", {
  define: { timestamps: false },
  host: "127.0.0.1",
  dialect: "postgres", // or the dialect you're using (e.g., 'postgres', 'sqlite', etc.)
});

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    employee_id: {
      type: DataTypes.UUID,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
    deleted_at: {
      type: DataTypes.DATE,
    },
    created_by: {
      type: DataTypes.DATE,
    },
    updated_by: {
      type: DataTypes.DATE,
    },
    deleted_by: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "users",
  }
);

module.exports = User;
