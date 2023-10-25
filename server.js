const express = require("express");
const app = express();
const connectDB = require("./config/dbConfig.js");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes.js");
const registerRouter = require("./routes/registerRoute.js");
const authRouter = require("./routes/authRoute.js");
const productRouter = require("./routes/productRoutes.js");
const orderRouter = require("./routes/orderRoutes.js");
const cartRouter = require("./routes/cartRoutes.js");
const stripeRouter = require("./routes/stripeRoutes.js");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/v1/register", registerRouter);
app.use("/api/v1/login", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/checkout", stripeRouter);

mongoose.connection.once("open", () => {
  console.log("Connected to database");
  app.listen(PORT, () => {
    console.log(
      `Listening to the requests that are being send to server at ${PORT}`
    );
  });
});
