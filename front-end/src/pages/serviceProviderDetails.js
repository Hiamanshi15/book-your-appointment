import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getServiceProviderById,
  updateServiceProvider,
  deleteServiceProvider,
} from "../redux/serviceProviderSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ServiceProviderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { provider, loading } = useSelector((state) => state.serviceProvider);
  const { token } = useSelector((state) => state.auth);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    serviceName: "",
    phone: "",
    experience: "",
    aboutService: "",
    address: "",
    availability: "",
  });

  useEffect(() => {
    if (id && token) {
      dispatch(getServiceProviderById({ userId: id, token }))
        .unwrap()
        .catch((error) => {
          toast.error(error?.msg || "Service Provider not found!");
        });
    }
  }, [dispatch, id, token]);

  useEffect(() => {
    if (provider) {
      setFormData({
        serviceName: provider.serviceName || "",
        phone: provider.phone || "",
        experience: provider.experience || "",
        aboutService: provider.aboutService || "",
        address: provider.address || "",
        availability: provider.availability || "",
      });
    }
  }, [provider]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = () => {
    dispatch(updateServiceProvider({ id, updatedData: formData, token }))
      .unwrap()
      .then(() => {
        toast.success("Service updated successfully!");
        setEditMode(false);
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error?.msg || "Failed to update provider.");
      });
  };

  const handleDelete = () => {
    dispatch(deleteServiceProvider({ id, token }))
      .unwrap()
      .then(() => {
        toast.success("Service deleted successfully!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error?.msg || "Failed to delete provider.");
      });
  };

  if (loading) {
    return (
      <>
        <ToastContainer position="top-center" autoClose={3000} />
        <p>Loading...</p>
      </>
    );
  }

  if (!provider) {
    return (
      <>
        <ToastContainer position="top-center" autoClose={3000} />
        <div className="not-found-container">
          <p className="not-found-message">Service not found.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div style={{ marginTop: "40px" }}>
        <h1 className="services-title">Service Provider Details</h1>
      </div>

      <div className="max-w-xl mx-auto p-4 bg-white shadow-lg rounded-lg style-details">
        <ToastContainer position="top-center" autoClose={3000} />

        <img
          src={provider.image}
          alt="Service Provider"
          onError={(e) => (e.target.style.display = "none")}
          className="w-full h-60 object-cover rounded mb-4" width={200}
        />

        {editMode ? (
          <>
            <div className="mt-2">
              <label className="block">Service Name:</label>
              <input
                type="text"
                name="serviceName"
                value={formData.serviceName}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>

            <div className="mt-2">
              <label className="block">Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>

            <div className="mt-2">
              <label className="block">Experience:</label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>

            <div className="mt-2">
              <label className="block">About Service:</label>
              <textarea
                name="aboutService"
                value={formData.aboutService}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>

            <div className="mt-2">
              <label className="block">Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>

            <div className="mt-2">
              <label className="block">Availability:</label>
              <input
                type="text"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>

            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <p>
              <strong>Name:</strong> {provider.serviceName}
            </p>
            <p>
              <strong>Phone:</strong> {provider.phone}
            </p>
            <p>
              <strong>Experience:</strong> {provider.experience}
            </p>
            <p>
              <strong>About:</strong> {provider.aboutService}
            </p>
            <p>
              <strong>Address:</strong> {provider.address}
            </p>
            <p>
              <strong>Availability:</strong> {provider.availability}
            </p>

            <div className="details-buttons">
              <button
                onClick={() => setEditMode(true)}
                className="bg-yellow-500 text-white px-4 py-2 rounded mt-4 mr-2 buttonsUpdate" 
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded mt-4 buttonsDelete"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ServiceProviderDetails;
