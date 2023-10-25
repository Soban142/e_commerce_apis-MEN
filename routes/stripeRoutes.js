const express = require("express");
const stripeMethod = require("../controllers/stripeController");

const stripeRouter = express.Router();

stripeRouter.post("/payment", stripeMethod);

module.exports = stripeRouter;
