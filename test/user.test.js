const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/User");
const assert = require("assert");

describe("User API", () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URI);
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

    assert.strictEqual(res.status, 201);
    assert.strictEqual(res.body.msg, "User registration successful");
  });
});
