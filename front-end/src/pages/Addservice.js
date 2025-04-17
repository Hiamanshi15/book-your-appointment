import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./style.css";

function AddService() {
  const token = useSelector((state) => state.auth.token);
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    serviceName: '',
    aboutService: '',
    address: '',
    phone: '',
    experience: '',
    availability: '',
    image: null,
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      const res = await axios.post('http://localhost:5000/api/service-providers/add', form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success("Service added successfully!");

      // Send email
      if (user?.email) {
        await fetch("http://localhost:5000/api/email/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: user.email,
            subject: "Service Added Successfully",
            html: `
              <h3>Hi ${user.name},</h3>
              <p>Your service has been successfully added.</p>
              <h4>Service Details:</h4>
              <ul>
                <li><strong>Service Name:</strong> ${formData.serviceName}</li>
                <li><strong>About:</strong> ${formData.aboutService}</li>
                <li><strong>Address:</strong> ${formData.address}</li>
                <li><strong>Phone:</strong> ${formData.phone}</li>
                <li><strong>Experience:</strong> ${formData.experience} years</li>
                <li><strong>Availability:</strong> ${formData.availability}</li>
              </ul>
              <p><strong>Note:</strong> You can add one free service only. If you need more, please contact us or upgrade to premium membership.</p>
            `,
          }),
        });
      }

      // ✅ Reset the form
      setFormData({
        serviceName: '',
        aboutService: '',
        address: '',
        phone: '',
        experience: '',
        availability: '',
        image: null,
      });

      // Also reset file input manually if needed
      document.querySelector('input[type="file"]').value = null;

    } catch (error) {
      console.error("Add service error:", error);
      toast.error('You have already added a service.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Service Provider</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="serviceName" placeholder="Service Name" value={formData.serviceName} onChange={handleChange} className="w-full p-2 border rounded" required />
        <textarea name="aboutService" placeholder="About Service" value={formData.aboutService} onChange={handleChange} className="w-full p-2 border rounded" required></textarea>
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" name="experience" placeholder="Experience (in years)" value={formData.experience} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="availability" placeholder="Availability (e.g., Mon-Fri, 9 AM - 5 PM)" value={formData.availability} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="file" name="image" onChange={handleFileChange} className="w-full" accept="image/*" required />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Submit
        </button>
      </form>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default AddService;
