const { logger } = require("../../config/logger");
const {
  populateContactDetails,
  generateContactFetchConditions,
} = require("../helpers/contact.helper");

const {
  LINK_PRECEDENCE_SECONDARY,
  LINK_PRECEDENCE_PRIMARY,
} = require("../utils/types/contact.types");
const {
  createNewContact,
  fetchContact,
} = require("../services/contact.service");

/**
 * Identifies the contact based on the provided email and phone number and returns the contact details.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
exports.identifyContact = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;

    let conditions = [];
    if (email) {
      conditions.push({ email });
    }
    if (phoneNumber) {
      conditions.push({ phoneNumber });
    }

    // Check for existing contacts with the same email or phone number
    const existingContact = await fetchContact(conditions);

    // If no existing contact, create a new one and return
    if (!existingContact) {
      const emails = [],
        phoneNumbers = [];
      const newContact = await createNewContact(
        email,
        phoneNumber,
        null,
        LINK_PRECEDENCE_PRIMARY
      );

      if (newContact.email) emails.push(newContact.email);
      if (newContact.phoneNumber) phoneNumbers.push(newContact.phoneNumber);

      return res.status(200).json({
        contact: {
          primaryContactId: newContact.id,
          emails,
          phoneNumbers,
          secondaryContactIds: [],
        },
      });
    }

    if (existingContact.linkPrecedence === LINK_PRECEDENCE_PRIMARY) {
      conditions = generateContactFetchConditions(
        existingContact.email,
        existingContact.phoneNumber,
        existingContact.id,
        existingContact.id,
        email,
        phoneNumber
      );
    } else if (existingContact.linkPrecedence === LINK_PRECEDENCE_SECONDARY) {
      conditions = generateContactFetchConditions(
        existingContact.email,
        existingContact.phoneNumber,
        existingContact.linkedId,
        existingContact.linkedId,
        email,
        phoneNumber
      );
    }

    return res
      .status(200)
      .json(await populateContactDetails(conditions, email, phoneNumber));
  } catch (error) {
    logger.error("Error identifying contact:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};
