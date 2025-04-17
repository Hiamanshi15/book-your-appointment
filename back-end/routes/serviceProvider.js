const express = require("express");
const ServiceProvider = require("../model/ServiceProvider");
const authMiddleware = require("../middleware/auth");
const router = express.Router();
const upload = require("../middleware/upload");
const path = require("path");

// Utility to build full image URL
const getImageUrl = (req, imageName) => {
  return imageName ? `${req.protocol}://${req.get("host")}/uploads/${imageName}` : null;
};

// ✅ POST - Add Service Provider Details with image
router.post("/add", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { serviceName, aboutService, address, phone, experience, availability } = req.body;
    const image = req.file ? req.file.filename : null;

    let existingProvider = await ServiceProvider.findOne({ user: req.user.id });
    if (existingProvider) {
      return res.status(400).json({ msg: "You have already added service details" });
    }

    const serviceProvider = new ServiceProvider({
      user: req.user.id,
      serviceName,
      aboutService,
      address,
      phone,
      experience,
      availability,
      image,
    });

    await serviceProvider.save();

    const response = {
      ...serviceProvider._doc,
      image: getImageUrl(req, serviceProvider.image),
    };

    res.status(201).json({ msg: "Service details added successfully", serviceProvider: response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET - All Service Providers
router.get("/", async (req, res) => {
  try {
    const providers = await ServiceProvider.find().populate("user", "name email");

    const formattedProviders = providers.map((provider) => ({
      ...provider._doc,
      image: getImageUrl(req, provider.image),
    }));

    res.status(200).json(formattedProviders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET - Service Provider by ID
router.get("/:id", async (req, res) => {
  try {
    const provider = await ServiceProvider.findById(req.params.id).populate("user", "name email");
    if (!provider) return res.status(404).json({ msg: "Service Provider not found" });

    const formattedProvider = {
      ...provider._doc,
      image: getImageUrl(req, provider.image),
    };

    res.status(200).json(formattedProvider);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET - Service Provider Details by Logged-In User
router.get("/by-user/:userId", async (req, res) => {
  try {
    const provider = await ServiceProvider.findOne({ user: req.params.userId }).populate("user", "name email");

    if (!provider) return res.status(404).json({ msg: "Service Provider not found" });

    const formattedProvider = {
      ...provider._doc,
      image: getImageUrl(req, provider.image),
    };

    res.status(200).json(formattedProvider);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// ✅ PUT - Update Service Provider Details (with image)
router.put("/:id", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { serviceName, aboutService, address, phone, experience, availability } = req.body;
    const image = req.file ? req.file.filename : null;

    let provider = await ServiceProvider.findOne({ user: req.user.id });

    if (!provider) {
      return res.status(404).json({ msg: "Service Provider details not found" });
    }

    // Update fields
    provider.serviceName = serviceName || provider.serviceName;
    provider.aboutService = aboutService || provider.aboutService;
    provider.address = address || provider.address;
    provider.phone = phone || provider.phone;
    provider.experience = experience || provider.experience;
    provider.availability = availability || provider.availability;
    if (image) provider.image = image;

    await provider.save();

    const response = {
      ...provider._doc,
      image: getImageUrl(req, provider.image),
    };

    res.status(200).json({ msg: "Service details updated successfully", provider: response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE - Remove Service Provider
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const provider = await ServiceProvider.findOneAndDelete({ user: req.user.id });
    if (!provider) return res.status(404).json({ msg: "Service Provider details not found" });

    res.status(200).json({ msg: "Service details deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
