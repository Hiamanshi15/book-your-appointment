const express = require("express");
const Service = require("../model/Service");

const router = express.Router();

// Add a new service
router.post("/add", async (req, res) => {
  try {
    const { serviceName, description } = req.body;

    // Check if service already exists
    let existingService = await Service.findOne({ serviceName });
    if (existingService) {
      return res.status(400).json({ msg: "Service already exists" });
    }

    // Create a new service
    const service = new Service({ serviceName, description });
    await service.save();

    res.status(201).json({ msg: "Service added successfully", service });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get service by ID
router.get("/:id", async (req, res) => {
    try {
      const service = await Service.findById(req.params.id);
      if (!service) return res.status(404).json({ msg: "Service not found" });
  
      res.status(200).json(service);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

// Update a service
router.put("/update/:id", async (req, res) => {
  try {
    const { serviceName, description } = req.body;

    // Check if service exists
    let service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ msg: "Service not found" });

    // Update service fields
    if (serviceName) service.serviceName = serviceName;
    if (description) service.description = description;

    await service.save();
    res.status(200).json({ msg: "Service updated successfully", service });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a service
router.delete("/:id", async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ msg: "Service not found" });

    res.status(200).json({ msg: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
