const express = require("express");

const {
  addCart,
  updateCart,
  deleteCart,
  getCart,
  getAllCarts,
} = require("../controllers/cartControllers.js");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyJWT.js");

const cartRouter = express.Router();

cartRouter.post("/", verifyToken, addCart);
cartRouter.put("/:id", verifyTokenAndAuthorization, updateCart);
cartRouter.delete("/:id", verifyTokenAndAuthorization, deleteCart);
cartRouter.get("/find/:id", verifyTokenAndAuthorization, getCart);
cartRouter.get("/", verifyTokenAndAdmin, getAllCarts);

module.exports = cartRouter;
