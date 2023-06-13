const Contact = require("../api/models/contact");
const {
  LINK_PRECEDENCE_SECONDARY,
  LINK_PRECEDENCE_PRIMARY,
} = require("../api/utils/types/contact.types");
const db = require("../config/db");
const { logger } = require("../config/logger");

const contactData = [
  {
    phoneNumber: "+1234567890",
    email: "john@example.com",
    linkedId: null,
    linkPrecedence: LINK_PRECEDENCE_PRIMARY,
    deletedAt: null,
  },
  {
    phoneNumber: "+9876543210",
    email: "jane@example.com",
    linkedId: 1,
    linkPrecedence: LINK_PRECEDENCE_SECONDARY,
    deletedAt: null,
  },
];

const seedData = async () => {
  try {
    // Sync the model with the database to create the table if it doesn't exist
    await Contact.sync();

    // Insert the sample data into the "Contact" table
    await Contact.bulkCreate(contactData);

    console.log("Data seeded successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await db.close();
  }
};

// Call the seedData function to start the seeding process
(async () => {
  try {
    await db.authenticate();
    logger.info("DB connection has been established successfully.");
    await seedData();
  } catch (error) {
    logger.error(
      "Fatal: Exiting service, unable to connect to the database:",
      error
    );
    process.exit(1);
  }
})();
