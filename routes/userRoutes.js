const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  getAllUser,
  userStats,
} = require("../controllers/userController.js");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyJWT.js");

const userRouter = express.Router();

userRouter.put("/:id", verifyTokenAndAuthorization, updateUser);
userRouter.delete("/:id", verifyTokenAndAuthorization, deleteUser);
userRouter.get("/find/:id", verifyTokenAndAdmin, getUser);
userRouter.get("/", verifyTokenAndAdmin, getAllUser);
userRouter.get("/stats", verifyTokenAndAdmin, userStats);

module.exports = userRouter;
