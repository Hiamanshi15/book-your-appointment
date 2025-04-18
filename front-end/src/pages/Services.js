import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllServiceProviders } from "../redux/serviceProviderSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

const Services = () => {
  const dispatch = useDispatch();
  const { providers, loading } = useSelector((state) => state.serviceProvider);

  const [showModal, setShowModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [userNote, setUserNote] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [userContact, setUserContact] = useState("");

  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(getAllServiceProviders());
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, [dispatch]);

  const handleMakeAppointment = (provider) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      toast.error("Please login to make an appointment!");
      return;
    }

    setUser(storedUser); // in case it's not already set
    setSelectedProvider(provider);
    setShowModal(true);
  };

  // const handleSubmitAppointment = async () => {
  //   try {
  //     const appointmentData = {
  //       userId: user.id,
  //       providerId: selectedProvider.user._id,
  //       serviceId: selectedProvider._id,
  //       appointmentDate,
  //       userNote,
  //       userName: user.name,
  //       userContact: userContact
  //     };

  //     await axios.post(
  //       "https://book-your-appointment.onrender.com/api/appointments/book",
  //       appointmentData
  //     );

  //     toast.success("Appointment booked successfully!");
  //     setShowModal(false);
  //     setAppointmentDate("");
  //     setUserNote("");
  //     setSelectedProvider(null);
  //   } catch (error) {
  //     console.error("Error booking appointment", error);
  //     toast.error("Failed to book appointment!");
  //   }
  // };

  const handleSubmitAppointment = async () => {
    try {
      const appointmentData = {
        userId: user.id,
        providerId: selectedProvider.user._id,
        serviceId: selectedProvider._id,
        appointmentDate,
        userNote,
        userName: user.name,
        userContact: userContact,
      };
  
      // 1. Book appointment
      await axios.post("https://book-your-appointment.onrender.com/api/appointments/book", appointmentData);
  
      // 2. Send confirmation email to USER (who booked)
      await fetch("https://book-your-appointment.onrender.com/api/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: user.email,
          subject: "Appointment Confirmation - BookYourAppointment",
          html: `
            <div style="font-family: Arial; background: #f4f4f4; padding: 20px;">
              <h2>Hello ${user.name},</h2>
              <p>Thank you for booking an appointment with <strong>${selectedProvider.user?.name}</strong>.</p>
              <p><strong>Service:</strong> ${selectedProvider.serviceName}</p>
              <p><strong>Date:</strong> ${appointmentDate}</p>
              <p><strong>Your Note:</strong> ${userNote}</p>
              <br/>
              <p style="color: #555;">We’ll keep you updated. See you soon!</p>
              <p><strong>Team BookYourAppointment</strong></p>
            </div>
          `,
        }),
      });
  
      // 3. Send appointment notification to PROVIDER
      await fetch("https://book-your-appointment.onrender.com/api/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: selectedProvider.user?.email,
          subject: "New Appointment Booked - BookYourAppointment",
          html: `
            <div style="font-family: Arial; background: #f4f4f4; padding: 20px;">
              <h2>Hello ${selectedProvider.user?.name},</h2>
              <p>You have received a new appointment request from <strong>${user.name}</strong>.</p>
              <p><strong>Service:</strong> ${selectedProvider.serviceName}</p>
              <p><strong>Date:</strong> ${appointmentDate}</p>
              <p><strong>Contact:</strong> ${userContact}</p>
              <p><strong>Note:</strong> ${userNote}</p>
              <br/>
              <p style="color: #555;">Please respond as needed.</p>
              <p><strong>Team BookYourAppointment</strong></p>
            </div>
          `,
        }),
      });
  
      toast.success("Appointment booked and emails sent!");
      setShowModal(false);
      setAppointmentDate("");
      setUserNote("");
      setUserContact("");
      setSelectedProvider(null);
  
    } catch (error) {
      console.error("Error booking appointment or sending emails", error);
      toast.error("Failed to book appointment or send emails!");
    }
  };
  

  const handleCancelModal = () => {
    setShowModal(false);
    setAppointmentDate("");
    setUserNote("");
    setSelectedProvider(null);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="services-container">
      <h2 className="services-title">Services</h2>
      <div className="services-grid">
        {providers.map((provider) => (
          <div key={provider._id} className="service-card">
            <img
              src={provider.image}
              alt={provider.serviceName}
              className="card-image"
              width={300}
            />
            <h4>{provider.serviceName}</h4>
            <p><strong>Name:</strong> {provider.user?.name}</p>
            <p><strong>Phone:</strong> {provider.phone}</p>
            <p><strong>Email:</strong> {provider.user?.email}</p>
            <p><strong>Experience:</strong> {provider.experience} yrs</p>
            <p className="truncate"><strong>About:</strong> {provider.aboutService}</p>
            <button className="explore-btn" onClick={() => handleMakeAppointment(provider)}>
              Make Appointment
            </button>
          </div>
        ))}
      </div>

      {showModal && selectedProvider && user && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h3>Confirm Appointment</h3>
            <p><strong>Logged in User:</strong> {user.name}</p>
            <p><strong>Service:</strong> {selectedProvider.serviceName}</p>
            <p><strong>Provider:</strong> {selectedProvider.user?.name}</p>

            <div>
              <label htmlFor="appointmentDate">Appointment Date:</label>
              <input
                type="datetime-local"
                id="appointmentDate"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="userContact">Contact No.:</label>
              <input
                type="text"
                id="userContact"
                placeholder="Contact Details"
                value={userContact}
                onChange={(e) => setUserContact(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="userNote">Add a note:</label>
              <textarea
                id="userNote"
                value={userNote}
                onChange={(e) => setUserNote(e.target.value)}
                placeholder="Add any notes about your appointment"
              />
            </div>

            <button onClick={handleSubmitAppointment}>Confirm</button>
            <button onClick={handleCancelModal} className="cancel-btn">Cancel</button>
          </div>
        </div>
      )}

      {/* Toast Notification Container */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Services;
