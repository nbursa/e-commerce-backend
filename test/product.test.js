const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Product = require("../models/Product");
const assert = require("assert");

describe("Product API", () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  after(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await Product.deleteMany({});
  });

  it("should get all products", async () => {
    const product = new Product({
      name: "Test Product",
      price: 100,
      description: "Test description",
      category: "Test category",
      countInStock: 10,
      image: "test-image.jpg",
    });
    await product.save();

    const res = await request(app).get("/api/products");
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.length, 1);
    assert.strictEqual(res.body[0].name, "Test Product");
  });
});
