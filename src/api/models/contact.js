const { DataTypes, Model } = require("sequelize");
const db = require("../config/db");

class Contact extends Model {}

Contact.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkedId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    linkPrecedence: {
      type: DataTypes.ENUM,
      values: ["primary", "secondary"],
      defaultValue: "primary",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: "Contact",
    tableName: "Contact",
    timestamps: true, // Adds createdAt and updatedAt for each new entry
    paranoid: true, // Adds deletedAt for each deleted entry, thus acts as a soft delete
  }
);
