const app = require("./config/express");
const db = require("./config/db");
const { logger } = require("./config/logger");

const PORT = process.env.PORT;

(async () => {
  try {
    await db.authenticate();
    logger.info("DB connection has been established successfully.");
    app.listen(PORT, () => {
      logger.info(`Server is up and running on port ${PORT}`);
    });
  } catch (error) {
    logger.error(
      "Fatal: Exiting service, unable to connect to the database:",
      error
    );
    process.exit(1);
  }
})();
