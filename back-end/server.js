require("dotenv").config();

const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const emailRoutes = require('./emailRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// API Routes mail 
app.use('/api/email', emailRoutes);


// for user log and register
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);
const protectedRoutes = require("./routes/protected");
app.use("/api/protected", protectedRoutes);
//add role
const roleRoutes = require("./routes/roles");
app.use("/api/roles", roleRoutes);
//add services like dr, advocate, barber etc.
const serviceRoutes = require("./routes/services");
app.use("/api/services", serviceRoutes);
// add about service detais 
const serviceProviderRoutes = require("./routes/serviceProvider");
app.use("/api/service-providers", serviceProviderRoutes);
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//book appintment
const appointmentRoutes = require('./routes/appointmentRoutes');
app.use('/api/appointments', appointmentRoutes); 
//contact us Routes
const contactRoutes = require("./routes/contact");
app.use("/api/contact", contactRoutes);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
