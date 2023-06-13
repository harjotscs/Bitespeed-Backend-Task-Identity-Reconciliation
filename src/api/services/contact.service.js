const { Op } = require("sequelize");
const Contact = require("../models/contact");
const { LINK_PRECEDENCE_SECONDARY } = require("../utils/types/contact.types");

const transitionContactPrecedence = async (
  primaryContactId,
  additionalPrimaryContactId
) => {
  await Contact.update(
    {
      linkPrecedence: LINK_PRECEDENCE_SECONDARY,
      linkedId: primaryContactId,
    },
    {
      where: {
        [Op.or]: [
          { id: additionalPrimaryContactId },
          { linkedId: additionalPrimaryContactId },
        ],
      },
    }
  );
};

const fetchContacts = async (conditions, order) => {
  return await Contact.findAll({
    where: {
      [Op.or]: conditions,
    },
    order: order,
  });
};

const fetchContact = async (conditions) => {
  return await Contact.findOne({
    where: {
      [Op.or]: conditions,
    },
    raw: true,
  });
};

const createNewContact = async (
  email,
  phoneNumber,
  linkedId,
  linkPrecedence
) => {
  return await Contact.create({
    email,
    phoneNumber,
    linkedId,
    linkPrecedence,
  });
};

module.exports = {
  createNewContact,
  fetchContacts,
  transitionContactPrecedence,
  fetchContact,
};
