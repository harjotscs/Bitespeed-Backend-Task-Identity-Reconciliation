const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");

router.route("/identify").get(contactController.identify);

module.exports = router;
