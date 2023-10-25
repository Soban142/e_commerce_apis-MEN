const Cart = require("../models/Cart.js");

const addCart = async (req, res) => {
  try {
    const cart = await Cart.create(req.body);
    res.status(201).json({ data: cart });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedCart);
  } catch (error) {
    res.satus(500).json(error);
  }
};

const deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json("Cart has been deleted");
  } catch (error) {
    res.satus(500).json(error);
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });
    res.status(200).json({
      data: cart,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json({
      data: carts,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  addCart,
  updateCart,
  deleteCart,
  getCart,
  getAllCarts,
};
