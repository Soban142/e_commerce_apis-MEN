const express = require("express");
const { loginUser } = require("../controllers/authController.js");

const authRouter = express.Router();

authRouter.post("/", loginUser);

module.exports = authRouter;
