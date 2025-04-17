import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, loginUser } from '../redux/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import 'react-toastify/dist/ReactToastify.css';
import './Signin.css';

const SignUpLogin = () => {
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate function
  const { loading } = useSelector((state) => state.auth);

  // State for Signup
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    roleName: '',
  });

  // State for Login
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Handlers for signup data changes
  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  // Handlers for login data changes
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Signup submit handler
  // const handleSignupSubmit = async (e) => {
  //   e.preventDefault();

  //   if (signupData.password !== signupData.confirmPassword) {
  //     toast.error("Passwords do not match");
  //     return;
  //   }

  //   const { confirmPassword, ...submitData } = signupData;

  //   try {
  //     const result = await dispatch(registerUser(submitData));

  //     if (registerUser.fulfilled.match(result)) {
  //       toast.success("Signup successful!");
  //       setSignupData({
  //         name: '',
  //         email: '',
  //         password: '',
  //         confirmPassword: '',
  //         roleName: '',
  //       });
  //     } else {
  //       toast.error(result.payload?.message || "Signup failed");
  //     }
  //   } catch {
  //     toast.error("Something went wrong during signup");
  //   }
  // };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
  
    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
  
    const { confirmPassword, ...submitData } = signupData;
  
    try {
      const result = await dispatch(registerUser(submitData));
  
      if (registerUser.fulfilled.match(result)) {
        toast.success("Signup successful!");
        await fetch("http://localhost:5000/api/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: signupData.email,
            subject: "Welcome to BookYourAppointment!",
            html: `
              <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
                <h2 style="color: #333;">Hello ${signupData.name},</h2>
                <p>Thank you for registering at <strong>BookYourAppointment</strong>!</p>
                <p>We’re excited to have you on board. Let us help you book and manage your appointments with ease.</p>
                <br/>
                <p style="color: #555;">Best Regards,</p>
                <p><strong>Team BookYourAppointment</strong></p>
              </div>
            `
          })
        });
        setSignupData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          roleName: '',
        });
      } else {
        toast.error(result.payload?.message || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong during signup");
    }
  };
  
  // Login submit handler
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(loginUser(loginData));

      if (loginUser.fulfilled.match(result)) {
        toast.success("Login successful!");
        setLoginData({
          email: '',
          password: '',
        });
        navigate('/'); 
      } else {
        toast.error(result.payload?.message || "Login failed");
      }
    } catch {
      toast.error("Something went wrong during login");
    }
  };

  return (
    <div>
      <div className="auth_container">
        <div className={`auth_slider ${isSignup ? "auth_moveslider" : ""}`}></div>
        <div className="auth_btn">
          <button className="auth_login" onClick={() => setIsSignup(false)}>
            Login
          </button>
          <button className="auth_signup" onClick={() => setIsSignup(true)}>
            Signup
          </button>
        </div>

        <div className={`auth_form-section ${isSignup ? "auth_form-section-move" : ""}`}>
          {/* Login Form */}
          <form className="auth_login-box" onSubmit={handleLoginSubmit}>
            <input
              type="email"
              name="email"
              className="auth_email auth_ele"
              placeholder="youremail@email.com"
              value={loginData.email}
              onChange={handleLoginChange}
              required
            />
            <input
              type="password"
              name="password"
              className="auth_password auth_ele"
              placeholder="password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />
            <button className="auth_clkbtn" type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Signup Form */}
          <form className="auth_signup-box" onSubmit={handleSignupSubmit}>
            <input
              type="text"
              name="name"
              className="auth_name auth_ele"
              placeholder="Enter your name"
              value={signupData.name}
              onChange={handleSignupChange}
              required
            />
            <select
              name="roleName"
              className="auth_dropdown auth_ele"
              value={signupData.roleName}
              onChange={handleSignupChange}
              required
            >
              <option value="">Select your role</option>
              <option value="User">User</option>
              <option value="ServiceProvider">Service Provider</option>
              
            </select>
            <input
              type="email"
              name="email"
              className="auth_email auth_ele"
              placeholder="youremail@email.com"
              value={signupData.email}
              onChange={handleSignupChange}
              required
            />
            <input
              type="password"
              name="password"
              className="auth_password auth_ele"
              placeholder="password"
              value={signupData.password}
              onChange={handleSignupChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              className="auth_password auth_ele"
              placeholder="Confirm password"
              value={signupData.confirmPassword}
              onChange={handleSignupChange}
              required
            />
            <button className="auth_clkbtn" type="submit" disabled={loading}>
              {loading ? 'Signing up...' : 'Signup'}
            </button>
          </form>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SignUpLogin;
