const app = require("./config/express");
const db = require("./config/db");

const PORT = process.env.PORT;

(async () => {
  try {
    await db.authenticate();
    logger.info("DB connection has been established successfully.");
  } catch (error) {
    logger.error(
      "Fatal: Exiting service, unable to connect to the database:",
      error
    );
    process.exit(1);
  }
})();

app.listen(PORT, () => {
  logger.info(`Server is up and running on port ${PORT}`);
});
