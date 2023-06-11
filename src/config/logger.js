const { logLevel } = require("./vars");

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const logHandler = (level, ...args) => {
  if (logLevels[level] <= logLevels[logLevel]) {
    console[level](level + ": ", ...args);
  }
};

const logger = {
  error: logHandler.bind(null, "error"),
  warn: logHandler.bind(null, "warn"),
  info: logHandler.bind(null, "info"),
  debug: logHandler.bind(null, "debug"),
};
module.exports = {
  logger,
};
