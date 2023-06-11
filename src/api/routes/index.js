const express = require("express");

const router = express.Router();

router.use("/", require("./contacts"));

module.exports = router;
