// routes/roles.js
const express = require("express");
const Role = require("../model/Role"); 

const router = express.Router();

// Create a new role (e.g., User, Service Provider)
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Role name is required" });
    }

    // Check if the role already exists
    const roleExists = await Role.findOne({ name });
    if (roleExists) {
      return res.status(400).json({ error: "Role already exists" });
    }

    const role = new Role({ name });
    await role.save();

    return res.status(201).json({ success: true, role });
  } catch (error) {
    console.error("Error creating role:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

// Get all roles
router.get("/", async (req, res) => {
  try {
    const roles = await Role.find();
    return res.status(200).json({ roles });
  } catch (error) {
    console.error("Error fetching roles:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

// DELETE - Delete a role by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedRole = await Role.findByIdAndDelete(req.params.id);
    if (!deletedRole) {
      return res.status(404).json({ error: "Role not found" });
    }
    return res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    console.error("Error deleting role:", error);
    return res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
