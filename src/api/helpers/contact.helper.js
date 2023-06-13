const {
  fetchContacts,
  transitionContactPrecedence,
  createNewContact,
} = require("../services/contact.service");
const {
  LINK_PRECEDENCE_SECONDARY,
  LINK_PRECEDENCE_PRIMARY,
} = require("../utils/types/contact.types");

const generateContactFetchConditions = (
  existingContactEmail,
  existingContactPhoneNumber,
  linkedId,
  id,
  email,
  phoneNumber
) => {
  const conditions = [{ linkedId }, { id }];

  if (email) {
    conditions.push({ email });
  } else if (existingContactEmail) {
    conditions.push({ email: existingContactEmail });
  }

  if (phoneNumber) {
    conditions.push({ phoneNumber });
  } else if (existingContactPhoneNumber) {
    conditions.push({ phoneNumber: existingContactPhoneNumber });
  }
  return conditions;
};

/**
 * Checks if the contact is already linked and updates the flags accordingly.
 * @param {string} email - Email to check.
 * @param {string} phoneNumber - Phone number to check.
 * @param {string} contactEmail - Email of the contact being checked.
 * @param {string} contactPhoneNumber - Phone number of the contact being checked.
 * @param {boolean} isEmailAlreadyUsed - Flag indicating if the email is already used.
 * @param {boolean} isPhoneNumberAlreadyUsed - Flag indicating if the phone number is already used.
 * @returns {Object} - Object containing the updated flags.
 */

const isContactAlreadyLinked = (
  email,
  phoneNumber,
  contactEmail,
  contactPhoneNumber,
  isEmailAlreadyUsed,
  isPhoneNumberAlreadyUsed
) => {
  if (!email || (!isEmailAlreadyUsed && contactEmail === email)) {
    isEmailAlreadyUsed = true;
  }
  if (
    !phoneNumber ||
    (!isPhoneNumberAlreadyUsed && contactPhoneNumber === phoneNumber)
  ) {
    isPhoneNumberAlreadyUsed = true;
  }
  return { isEmailAlreadyUsed, isPhoneNumberAlreadyUsed };
};

/**
 * Populates the contact details based on the given conditions, email, and phone number.
 * @param {Object} conditions - Query conditions for fetching contacts.
 * @param {string} email - Email, recieved in the payload for Identification.
 * @param {string} phoneNumber - Phone number, recieved in the payload for Identification.
 * @returns {Promise{Object}} - Object containing the populated contact details such as primaryContactId, emails, phoneNumbers, and secondaryContactIds.
 */
const populateContactDetails = async (conditions, email, phoneNumber) => {
  const linkedContacts = await fetchContacts(conditions, [
    ["createdAt", "ASC"],
  ]);

  // Initialize the primary contact with the first contact in the linked contacts array and default values for emails and phone numbers etc
  const primaryContact = linkedContacts[0];
  const primaryContactId = primaryContact.id;
  const emails = new Set();
  const phoneNumbers = new Set();
  const secondaryContactIds = [];
  let hasAnotherPrimaryContact = false,
    isEmailAlreadyUsed = false,
    isPhoneNumberAlreadyUsed = false,
    anotherPrimaryIndex;

  // Add the email and phone number of the primary contact to the set
  if (primaryContact.email) {
    emails.add(primaryContact.email);
  }
  if (primaryContact.phoneNumber) {
    phoneNumbers.add(primaryContact.phoneNumber);
  }

  // Loop through the linked contacts array to populate the emails, phone numbers, and secondary contact ids
  if (linkedContacts.length === 1) {
    const data = isContactAlreadyLinked(
      email,
      phoneNumber,
      primaryContact.email,
      primaryContact.phoneNumber,
      isEmailAlreadyUsed,
      isPhoneNumberAlreadyUsed
    );
    isEmailAlreadyUsed = data.isEmailAlreadyUsed;
    isPhoneNumberAlreadyUsed = data.isPhoneNumberAlreadyUsed;
  } else if (linkedContacts.length > 1) {
    for (let i = 1; i < linkedContacts.length; i++) {
      const contact = linkedContacts[i];
      if (contact.email) {
        emails.add(contact.email);
      }
      contact.phoneNumber && phoneNumbers.add(contact.phoneNumber);
      secondaryContactIds.push(contact.id);
      if (contact.linkPrecedence === LINK_PRECEDENCE_PRIMARY) {
        anotherPrimaryIndex = i;
        hasAnotherPrimaryContact = true;
      }
      const data = isContactAlreadyLinked(
        email,
        phoneNumber,
        contact.email,
        contact.phoneNumber,
        isEmailAlreadyUsed,
        isPhoneNumberAlreadyUsed
      );
      isEmailAlreadyUsed = data.isEmailAlreadyUsed;
      isPhoneNumberAlreadyUsed = data.isPhoneNumberAlreadyUsed;
    }
  }

  // If there is another primary contact, transition the primary contact precedence to secondary
  if (hasAnotherPrimaryContact) {
    await transitionContactPrecedence(
      primaryContactId,
      linkedContacts[anotherPrimaryIndex].id
    );
  }

  // If the email or phone number is not already used, create a new secondary contact and add it to the secondary contact ids
  if (!isEmailAlreadyUsed || !isPhoneNumberAlreadyUsed) {
    const createdContact = await createNewContact(
      email,
      phoneNumber,
      primaryContactId,
      LINK_PRECEDENCE_SECONDARY
    );
    email && emails.add(createdContact.email);
    phoneNumber && phoneNumbers.add(createdContact.phoneNumber);
    secondaryContactIds.push(createdContact.id);
  }

  return {
    primaryContactId,
    emails: Array.from(emails),
    phoneNumbers: Array.from(phoneNumbers),
    secondaryContactIds,
  };
};

module.exports = {
  populateContactDetails,
  generateContactFetchConditions,
};
