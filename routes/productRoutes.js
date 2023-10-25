const express = require("express");
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
} = require("../controllers/productsController.js");
const { verifyTokenAndAdmin } = require("../middlewares/verifyJWT.js");

const productRouter = express.Router();

productRouter.post("/", verifyTokenAndAdmin, addProduct);
productRouter.put("/:id", verifyTokenAndAdmin, updateProduct);
productRouter.delete("/:id", verifyTokenAndAdmin, deleteProduct);
productRouter.get("/find/:id", getProduct);
productRouter.get("/", getAllProducts);

module.exports = productRouter;
