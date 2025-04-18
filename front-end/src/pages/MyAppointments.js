import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        `https://book-your-appointment.onrender.com/api/appointments/provider/${user?.id}`
      );
      setAppointments(response.data.appointments);
    } catch (error) {
      toast.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      const response = await axios.put(
        `https://book-your-appointment.onrender.com/api/appointments/${appointmentId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Status updated successfully");
      fetchAppointments(); // Refresh after update
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    if (user?.id) fetchAppointments();
  }, [user?.id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="appointments-container">
      <h2>My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        <div className="appointments-list">
          {appointments.map((appointment) => (
  <div
    key={appointment._id}
    className={`appointment-card status-${appointment.status}`}
  >
    <p><strong>User:</strong> {appointment.user?.name}</p>
    <p><strong>Contact No.:</strong> {appointment.userContact}</p>
    <p><strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleString()}</p>
    <p><strong>Notes:</strong> {appointment.userNote}</p>
    <p><strong>Status:</strong> {appointment.status}</p>

    <select
      value={appointment.status}
      onChange={(e) =>
        handleStatusChange(appointment._id, e.target.value)
      }
    >
      <option value="pending">Pending</option>
      <option value="completed">Completed</option>
      <option value="cancelled">Cancelled</option>
    </select>
  </div>
))}

        </div>
      )}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default MyAppointments;
