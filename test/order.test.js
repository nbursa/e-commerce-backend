const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Order = require("../models/Order");

describe("Order API", () => {
  let expect;

  before(async () => {
    expect = (await import("chai")).expect;
    await mongoose.connect(process.env.MONGO_URI, {});
  });

  after(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await Order.deleteMany({});
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

    const res = await request(app).post("/api/orders").send(orderData);
    expect(res.status).to.equal(201);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("orderItems");
  });
});
