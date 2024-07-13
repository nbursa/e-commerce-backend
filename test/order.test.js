const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = require("../app");
const Order = require("../models/Order");
const User = require("../models/User");
const assert = require("assert");

describe("Order API", () => {
  let token;
  before(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    const user = new User({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });
    await user.save();

    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  });

  after(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await Order.deleteMany({});
    await User.deleteMany({});
  });

  it("should create a new order", async () => {
    const orderData = {
      orderItems: [
        {
          name: "Product 1",
          qty: 1,
          price: 100,
          product: new mongoose.Types.ObjectId(),
        },
      ],
      shippingAddress: {
        address: "123 Street",
        city: "City",
        postalCode: "12345",
        country: "Country",
      },
      paymentMethod: "PayPal",
      itemsPrice: 100,
      taxPrice: 10,
      shippingPrice: 5,
      totalPrice: 115,
    };

    const res = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .send(orderData);

    assert.strictEqual(res.status, 201);
    assert.strictEqual(res.body.orderItems[0].name, "Product 1");
  });
});
