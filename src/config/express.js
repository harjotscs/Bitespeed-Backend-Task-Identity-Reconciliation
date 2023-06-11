const express = require("express");
const contactRouter = require("../api/routes/contact.router");

const app = express();

app.use("/", contactRouter);

module.exports = app;
