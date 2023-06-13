const { logger } = require("../../config/logger");

module.exports = function (schema) {
  return async function (req, res, next) {
    try {
      const validated = await schema.validateAsync(req.body);
      req.body = validated;
      next();
    } catch (err) {
      logger.debug(
        `validation error: ${JSON.stringify(
          err
        )}, for payload: ${JSON.stringify(req.body)}`
      );
      const error = err.details;
      res.status(400).send({ error });
    }
  };
};
