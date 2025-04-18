import React, { useState, useEffect } from "react";
import "./Contact.css";
import { useDispatch, useSelector } from "react-redux";
import { submitContact, resetContactState } from "../redux/contactSlice";

// Toastify imports
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Homecomponent = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.contact);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    message: "",
    newsletter: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(submitContact(formData));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(submitContact(formData));
  
    try {
      await fetch("https://book-your-appointment.onrender.com/api/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: formData.email,
          subject: "Thank you for contacting BookYourAppointment!",
          html: `
            <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
              <h2 style="color: #333;">Hello ${formData.name},</h2>
              <p>Thank you for reaching out to <strong>BookYourAppointment</strong>.</p>
              <p>We have received your message:</p>
              <p><em>${formData.message}</em></p>
              <p>Our team will get back to you shortly regarding: <strong>${formData.reason}</strong>.</p>
              <br/>
              <p style="color: #555;">Best Regards,</p>
              <p><strong>Team BookYourAppointment</strong></p>
            </div>
          `
        }),
      });
    } catch (err) {
      console.error("Error sending confirmation email:", err);
      toast.error("Failed to send confirmation email");
    }
  };
  
  useEffect(() => {
    if (success) {
      toast.success("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        reason: "",
        message: "",
        newsletter: false,
      });
    }

    if (error) {
      toast.error(error || "Failed to send message.");
    }

    if (success || error) {
      dispatch(resetContactState());
    }
  }, [success, error, dispatch]);

  return (
    <div className="con_contact-container">
      <div className="con_contact-right">
        <form onSubmit={handleSubmit}>
          <h1 className="services-title" style={{ marginTop: '0px' }}>Contact Us</h1>
          <p className="services-title">Please take a moment to get in touch, we will get back to you shortly.</p>

          <div className="con_column">
            <label>Your Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />

            <label>Phone Number</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

            <label>How can we help you?</label>
            <select name="reason" value={formData.reason} onChange={handleChange} required>
              <option value="">Choose one</option>
              <option value="calling-help">I need Help On Phone Call.</option>
              <option value="video-help">I need to video Call.</option>
              <option value="Complain-help">I have a complaine.</option>
              <option value="other-help">Other</option>
            </select>
          </div>

          <div className="con_column">
            <label>Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange} required></textarea>

            <div className="details-buttons">
              <input style={{ maxWidth: '200px' }} type="submit" value={loading ? "Sending..." : "Send Inquiry"} />
            </div>
          </div>
        </form>
      </div>

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Homecomponent;
