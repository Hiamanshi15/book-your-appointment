const mongoose = require("mongoose");

const serviceProviderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
    aboutService: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    availability: {
      type: String,
      required: true,
    },
    image: {
      type: String, // Store filename or URL
      required: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const ServiceProvider = mongoose.model("ServiceProvider", serviceProviderSchema);
module.exports = ServiceProvider;
