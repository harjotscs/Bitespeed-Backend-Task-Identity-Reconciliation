const { DataTypes, Model } = require("sequelize");
const db = require("../../config/db");
const {
  LINK_PRECEDENCE_SECONDARY,
  LINK_PRECEDENCE_PRIMARY,
} = require("../utils/types/contact.types");

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
      values: [LINK_PRECEDENCE_PRIMARY, LINK_PRECEDENCE_SECONDARY],
      defaultValue: LINK_PRECEDENCE_PRIMARY,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date().toISOString(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date().toISOString(),
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

module.exports = Contact;
