const express = require("express");
const contactRouter = require("../api/routes/contact.router");
const { logger } = require("./logger");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  const startTime = new Date();

  const logData = {
    path: req.path,
    body: req.body,
  };

  // Continue to the next middleware or route handler
  next();

  // Logging the response time latency
  const endTime = new Date();
  const latency = endTime - startTime;
  logData.responseTime = `${latency}ms`;

  logger.info(JSON.stringify(logData));
});

app.use("/", contactRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  // Handle errors here
  console.error(err);
  res.status(500).send({ error: "Internal server error" });
});

module.exports = app;
