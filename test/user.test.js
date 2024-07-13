const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/User");

describe("User API", () => {
  let expect;

  before(async () => {
    expect = (await import("chai")).expect;
    await mongoose.connect(process.env.MONGO_URI, {});
  });

  after(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it("should register a new user", async () => {
    const res = await request(app).post("/api/users/register").send({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("msg", "User registered successfully");
  });
});
