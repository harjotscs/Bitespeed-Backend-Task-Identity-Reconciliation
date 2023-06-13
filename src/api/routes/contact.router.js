const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");
const validator = require("../middlewares/validator.middleware");
const { contactsValidator } = require("../validators/contact.validators");
router
  .route("/identify")
  .post(validator(contactsValidator), contactController.identifyContact);

module.exports = router;
