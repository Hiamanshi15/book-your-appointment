import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import Logo from "../../Assets/img/logo-removebg-preview.png";
import "./Header.css";

function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const userRole = user ? (user.role || user.roleName) : null;
  const displayRole = userRole === "ServiceProvider" ? "Service Provider" : userRole;

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleAddServe = () => navigate("/AddService");

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  return (
    <header className="header">
      <div className="logo">
    <Link to="/"> {/* <-- Step 2 */}
      <img src={Logo} className="App-logo" alt="logo" />
    </Link>
  </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        {/* <Link to="/team">Our Team</Link> */}
        <Link to="/contact">Contact</Link>
        {userRole === "ServiceProvider" && user && (user._id || user.id) && (
          <Link to={`/provider/${user._id || user.id}`} onClick={closeMobileMenu}>
            Service Details
          </Link>
        )}
        {userRole === "ServiceProvider" && user && (user._id || user.id) && (
          <Link to={`/myappointments`} onClick={closeMobileMenu}>
            My Appointments
          </Link>
        )}


      </nav>

      <div className="auth-buttons">
        {user && user.name ? (
          <div className="user-menu" ref={dropdownRef}>
            <span className="user-name" onClick={toggleDropdown}>
              Hi, {user.name} &#9662;
            </span>
            {isDropdownOpen && (
              <div className="dropdown">
                <div className="user-info">
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Role:</strong> {displayRole}</p>
                </div>
                {userRole === "ServiceProvider" && (
                  <button className="btn-ServiceProvider" onClick={() => {
                    handleAddServe();
                    toggleDropdown();
                  }}>
                    Add Service
                  </button>
                )}
                <button className="register-btn btn-logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/signUpLogin" className="register-btn">
            SignUp / Login
          </Link>
        )}
      </div>

      <div className="hamburger" onClick={toggleMobileMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleMobileMenu}>
          &times;
        </button>
        <div className="mobile-menu-content">
          <Link to="/" onClick={closeMobileMenu}>Home</Link>
          <Link to="/about" onClick={closeMobileMenu}>About</Link>
          <Link to="/services" onClick={closeMobileMenu}>Services</Link>
          {/* <Link to="/team" onClick={closeMobileMenu}>Our Team</Link> */}
          <Link to="/contact"  onClick={closeMobileMenu}>Contact</Link>
          <Link to="/privacy-policy" onClick={closeMobileMenu}>Privacy Policy</Link>
          <Link to="/terms-and-conditions" onClick={closeMobileMenu}>Terms & Conditions</Link>
          {userRole === "ServiceProvider" && user && (user._id || user.id) && (
            <Link to={`/provider/${user._id || user.id}`} onClick={closeMobileMenu}>
              Service Details
            </Link>
          )}
          {userRole === "ServiceProvider" && user && (user._id || user.id) && (
          <Link to={`/myappointments`} onClick={closeMobileMenu}>
            My Appointments
            </Link>
          )}
          {user && user.name ? (
            <div className="mobile-user-menu">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {displayRole}</p>
              {userRole === "ServiceProvider" && (
                <button className="btn-ServiceProvider" onClick={() => {
                  handleAddServe();
                  closeMobileMenu();
                }}>
                  Add Service
                </button>
              )}
              <button className="register-btn btn-logout" onClick={() => {
                handleLogout();
                closeMobileMenu();
              }}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/signUpLogin" onClick={closeMobileMenu} className="register-btn">
              SignUp / Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
