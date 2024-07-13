const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Product = require("../models/Product");

describe("Product API", () => {
  let expect;

  before(async () => {
    expect = (await import("chai")).expect;
    await mongoose.connect(process.env.MONGO_URI, {});
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
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.equal(1);
  });
});
