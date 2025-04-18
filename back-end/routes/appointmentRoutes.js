//routes/appointmentRoutes.js
const express = require('express');
const Appointment = require('../model/Appointment');  // Import your Appointment model
const User = require('../model/User');  // Import User model
const router = express.Router();

// Create an appointment
const Role = require('../model/role'); // Make sure you import the Role model

router.post('/book', async (req, res) => {
  try {
    const { userId, providerId, serviceId, appointmentDate, userNote, userName, userContact} = req.body;

    // Step 1: Get the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Step 2: Find the 'User' role by name
    const userRole = await Role.findOne({ name: "User" });

    if (!userRole) {
      return res.status(500).json({ message: "Role not found in database" });
    }

    // Step 3: Compare user.role (ObjectId) with userRole._id
    if (!user.role.equals(userRole._id)) {
      return res.status(403).json({ message: "Only users can book appointments" });
    }

    // Step 4: Book the appointment
    const appointment = new Appointment({
      user: userId,
      provider: providerId,
      service: serviceId,
      appointmentDate,
      userNote,
      userName,
      userContact,
    });

    await appointment.save();

    return res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (err) {
    console.error("Error booking appointment:", err);
    return res.status(500).json({ message: 'Error booking appointment', error: err.message });
  }
});

// Get all appointments for a provider (without authentication)
router.get('/provider/:providerId', async (req, res) => {
  try {
    const { providerId } = req.params;

    const appointments = await Appointment.find({ provider: providerId })
      .populate('user', 'name email')
      .populate('service', 'serviceName');

    if (appointments.length === 0) {
      return res.status(404).json({ message: 'No appointments found for this provider' });
    }

    return res.status(200).json({ appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return res.status(500).json({ message: 'Failed to fetch appointments' });
  }
});


// Update appointment status
router.put('/:appointmentId/status', async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    return res.status(200).json({ message: 'Status updated', appointment: updatedAppointment });
  } catch (error) {
    console.error('Error updating status:', error);
    return res.status(500).json({ message: 'Failed to update status' });
  }
});

// GET /appointments (without pagination)
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('user', 'name email')
      .populate('service', 'serviceName');

    return res.status(200).json({
      appointments,
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return res.status(500).json({ message: 'Failed to fetch appointments' });
  }
});


module.exports = router;
