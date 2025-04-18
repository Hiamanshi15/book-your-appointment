import React from "react";
import "./style.css";
import Logo from "../Assets/img/logo-removebg-preview.png";


function About() {
    return (
        <div>
            <section className="about-section">
                <div className="about-content">
                    <h2>About Us</h2>
                    <p style={{textAlign: 'left',color: '#ffff'}}>
                        Welcome to <strong>QuickBook</strong> – Your One-Stop Appointment Solution!
                        <br /><br />
                        QuickBook is an all-in-one platform designed to simplify your life by allowing you to easily book appointments for a variety of services — whether you need to consult a doctor, schedule a haircut, call a technician, or find a reliable service provider.
                        <br /><br />
                        <strong>Why Choose Us?</strong><br />
                        ✅ Easy and quick appointment booking<br />
                        🧑‍⚕️ Certified doctors, skilled barbers, and expert engineers<br />
                        📱 User-friendly mobile experience<br />
                        🔒 Secure and private – your data is safe with us<br />
                        📆 Real-time scheduling and reminders<br />
                        <br />
                        We are continuously adding new services and providers to serve you better. Your convenience is our top priority.
                    </p>

                </div>
                <div className="about-logo">
                    <img src={Logo} className="App-logo" alt="logo" />
                </div>
            </section>
        </div>
    );
}

export default About;
