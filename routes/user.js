const express = require("express");
const router = express.router();
const User = require("../models/User");

// @route  POST /api/users/register
// @desc   Register a new user
// @access Public
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await user.findOnse({ email });

    if (user) {
      return res.status(400).json({ msg: "User already registered" });
    }

    user = new User({
      name,
      email,
      password,
    });

    await user.save();

    res.status(201).json({ msg: "User registration successful" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error: " + err.message);
  }
});

module.exports = router;
