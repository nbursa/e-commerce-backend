const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/order", orderRoutes);

module.exports = app;
