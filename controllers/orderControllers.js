const Order = require("../models/Order.js");

const addOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({ data: order });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.satus(500).json(error);
  }
};

const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json("Order has been deleted");
  } catch (error) {
    res.satus(500).json(error);
  }
};

const getOrder = async (req, res) => {
  const dateForLog = new Date();
  console.log(dateForLog);
  const logDate = dateForLog.setMonth(dateForLog.getMonth() - 1);
  console.log(dateForLog.getTime());
  console.log(logDate);
  try {
    const orders = await Order.find({ userId: req.params.id });
    res.status(200).json({
      data: orders,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      data: orders,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMonthlyIncome = async (req, res) => {
  const date = new Date();

  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  console.log("wow");

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(201).json(income);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  addOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrders,
  getMonthlyIncome,
};
