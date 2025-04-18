import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import MyAppointments from "./pages/MyAppointments";
import ContactUs from "./pages/ContactUs";
import Roles from "./pages/Roles";
import Settings from "./pages/Settings";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./components/rotectedRoute";
import { useAuth } from "./context/AuthContext";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <Header toggleSidebar={toggleSidebar} />}
        <div className="main-container">
          {isAuthenticated && (
            <div className="sidebar">
              <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
            </div>
          )}

          <main className="main-content" onClick={closeSidebar}>
            <Routes>
              <Route path="/signin" element={<SignIn />} />

              {/* Protected Routes */}
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
              <Route path="/appointments" element={<ProtectedRoute><MyAppointments /></ProtectedRoute>} />
              <Route path="/contact-us" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />
              <Route path="/roles" element={<ProtectedRoute><Roles /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

              {/* Redirect everything else to dashboard or login */}
              <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/signin"} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
