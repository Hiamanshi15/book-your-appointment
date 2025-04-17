import React from "react";
import Logo from "../Assets/img/logo-removebg-preview.png";

function TermsConditions() {
  return (
    <section className="about-section">
    <div style={{ padding: "30px", maxWidth: "900px", margin: "0 auto", lineHeight: "1.6", fontFamily: "Arial" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Terms & Conditions</h2>
        <p style={{color: '#ffff'}}>
            Welcome to QuickBook! By using our platform, you agree to the following terms and conditions.
        </p>
        <h4>1. Usage of Services</h4>
        <p style={{color: '#ffff'}}>
            You must be at least 18 years old to use our services. Do not misuse our platform for fraudulent activities.
        </p>
        <h4>2. Booking Responsibility</h4>
        <p style={{color: '#ffff'}}>
            You are responsible for providing accurate information during the booking process.
        </p>
        <h4>3. Cancellation Policy</h4>
        <p style={{color: '#ffff'}}>
            Cancellations must be made 24 hours before the scheduled appointment to avoid penalties.
        </p>
        <h4>4. Service Provider Conduct</h4>
        <p style={{color: '#ffff'}}>
            We ensure all listed service providers are verified and professional. However, we are not liable for personal disputes.
        </p>
        <h4>5. Modifications</h4>
        <p style={{color: '#ffff'}}>
            We reserve the right to update these terms anytime. Continued use of QuickBook means acceptance of changes.
        </p>
    </div>
    <div className="about-logo">
        <img src={Logo} className="App-logo" alt="logo" />
    </div>
    </section>
  );
}

export default TermsConditions;
