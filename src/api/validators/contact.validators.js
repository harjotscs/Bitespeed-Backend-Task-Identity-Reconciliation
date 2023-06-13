const Joi = require("joi");
const contactsValidator = Joi.object({
  phoneNumber: Joi.string(),
  email: Joi.string().email(),
}).or("phoneNumber", "email");

module.exports = {
  contactsValidator,
};
