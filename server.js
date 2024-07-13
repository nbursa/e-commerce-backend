const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

app.arguments(express.json());

const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/order", orderRoutes);

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port ${PORT}");
});
