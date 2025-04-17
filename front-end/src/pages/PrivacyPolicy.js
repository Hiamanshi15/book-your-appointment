import React from "react";
import Logo from "../Assets/img/logo-removebg-preview.png";

function PrivacyPolicy() {
  return (
    <section className="about-section">
    <div style={{ padding: "30px", maxWidth: "900px", margin: "0 auto", lineHeight: "1.6", fontFamily: "Arial" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", }}>Privacy Policy</h2>
      <p style={{color: '#ffff'}}>
        At QuickBook, we take your privacy seriously. This policy outlines how we collect, use, and protect your data.
      </p>
      <h4>1. Information We Collect</h4>
      <p style={{color: '#ffff'}}>
        We may collect personal details like name, email, phone number, and appointment history when you use our services.
      </p>
      <h4>2. How We Use Your Data</h4>
      <p style={{color: '#ffff'}}>
        Your data helps us improve our service, send reminders, and connect you with your selected service providers.
      </p>
      <h4>3. Data Security</h4>
      <p style={{color: '#ffff'}}>
        We implement robust security measures to protect your personal information from unauthorized access.
      </p>
      <h4>4. Third-Party Services</h4>
      <p style={{color: '#ffff'}}>
        We do not sell or share your data with third-party companies without your consent.
      </p>
      <h4>5. Changes to Privacy Policy</h4>
      <p style={{color: '#ffff'}}>
        We may update our policy from time to time. Please review this page periodically.
      </p>
    </div>
    <div className="about-logo">
        <img src={Logo} className="App-logo" alt="logo" />
    </div>
    </section>
  );
}

export default PrivacyPolicy;
