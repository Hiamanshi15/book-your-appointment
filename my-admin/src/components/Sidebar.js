import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ isOpen, onClose }) => {
  const sidebarRef = useRef(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <aside ref={sidebarRef} className={`sidebar ${isOpen ? "open" : ""}`}>
      <nav>
        <ul>
          <li><Link to="/" onClick={onClose}>Dashboard</Link></li>
          <li><Link to="/users" onClick={onClose}>Users</Link></li>
          <li><Link to="/appointments" onClick={onClose}>Appointments</Link></li>
          <li><Link to="/contact-us" onClick={onClose}>Contact Us</Link></li>
          <li><Link to="/roles" onClick={onClose}>Roles</Link></li>
          <li><Link to="/settings" onClick={onClose}>Settings</Link></li>
          <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
