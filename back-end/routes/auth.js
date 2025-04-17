// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Role = require("../model/Role"); // Import the Role model

const router = express.Router();

// REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, roleName } = req.body;

    // Check if role is valid
    const role = await Role.findOne({ name: roleName });
    if (!role) {
      return res.status(400).json({ msg: "Invalid role" });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    // Save user (password will be hashed automatically by userSchema.pre("save"))
    user = new User({
      name,
      email,
      password,
      role: role._id,
    });

    await user.save();
    res.status(201).json({ msg: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN USER
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    // Find user and populate role
    let user = await User.findOne({ email }).populate("role");

    if (!user) {
      console.log("User not found in DB");
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    // if (!isMatch) {
    //   console.log("Password mismatch");
    //   return res.status(400).json({ msg: "Invalid credentials" });
    // }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, role: user.role.name }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role.name,
      },
    });
  } catch (err) {
    console.error("Error in login route:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET ALL USERS
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().populate("role", "name"); // Populate role name only
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE USER by ID
router.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE USER by ID
router.put("/users/:id", async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const userId = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, role },
      { new: true }
    ).populate("role", "name");

    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
