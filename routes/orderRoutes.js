const express = require("express");
const {
  verifyTokenAndAdmin,
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyJWT.js");
const {
  addOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrders,
  getMonthlyIncome,
} = require("../controllers/orderControllers.js");

const orderRouter = express.Router();

orderRouter.get("/income", verifyTokenAndAdmin, getMonthlyIncome);
orderRouter.get("/:id", verifyTokenAndAuthorization, getOrder);
orderRouter.get("/", verifyTokenAndAdmin, getAllOrders);
orderRouter.post("/", verifyToken, addOrder);
orderRouter.put("/:id", verifyTokenAndAdmin, updateOrder);
orderRouter.delete("/:id", verifyTokenAndAdmin, deleteOrder);

module.exports = orderRouter;
