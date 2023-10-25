const express = require("express");
const { registerUser } = require("../controllers/registerController.js");

const registerRouter = express.Router();

registerRouter.post("/", registerUser);

module.exports = registerRouter;
