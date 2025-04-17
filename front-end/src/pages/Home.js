import React from "react";
import Dawnload from '../Assets/img/3902762.jpg'
import "./style.css";
import { Link } from "react-router-dom";
import ThreeStepSetup from "./ThreeStepSetup";
import IndustriesServed from './IndustriesServed ';
import SuperSupportImg from '../Assets/images/Super-Support.svg';
import MultiLocationImg from '../Assets/images/Multi-location-management.svg';
import SetupImg from '../Assets/images/Frame-14.svg';
import SecurityImg from '../Assets/images/Security.svg';
import FaqAccordion from './FaqAccordion'; 

function Home() {

    const featuresData = [
        {
            title: 'Super Support',
            description: 'Appointy is supported by a team of dedicated professionals who are always available via email, chat and phone',
            image: SuperSupportImg,
        },
        {
            title: 'Multi-Location Management',
            description: 'Appointy grows with your business! When you expand your business to multiple locations, Appointy allows easy management of all your locations & clients from a centralized admin portal',
            image: MultiLocationImg,
        },
        {
            title: 'Free Setup Assistance & Easy Migration',
            description: 'Easy onboarding and free personalized setup assistance from people who have onboarded thousands of businesses. Need to shift from your existing system? We take care of everything!',
            image: SetupImg,
        },
        {
            title: 'Security',
            description: 'We take customer data security very seriously. Your data is safe, backed-up on cloud, and you retain its complete ownership. Hosted on Google Cloud with high standards of reliability and security.',
            image: SecurityImg,
        }
    ];

    const faqList = [
        {
          question: 'What is an online booking system?',
          answer:
            'An online booking system allows the customers to book appointments with you or book your services through an online platform...'
        },
        {
          question: 'How can I manage all the bookings that are made in the booking software?',
          answer:
            'You can have complete control over all the bookings that are made in the system...'
        },
        {
          question: 'Can different staff members have their own login?',
          answer:
            'Yes, Appointy lets your staff members manage their bookings and schedule...'
        },
        {
          question: 'Does Appointy offer client and admin appointment scheduling apps?',
          answer:
            'Yes, we offer both. In the client app, clients can easily book, reschedule...'
        },
        // Add more FAQs as needed
      ];


    return (
        <div>
            
            <section className="content-section">
                {/* Left Text Content */}
                <div className="text-content">
                    <h6>APPOINTMENTS MAKE EASY</h6>
                    <h2 style={{ paddingTop: '0px' }}>
                        Find Any Kind of Services<br></br>on your finger tips.
                    </h2>
                    <h3>Find Service nearby</h3>
                    <button className="explore-btn"><Link to="/services" style={{ textDecoration: 'none', color: 'white' }}>Find Now</Link></button>
                </div>

                {/* Right Image */}
                <div className="image-content">
                    <img src={Dawnload} alt="DoctorzBook" />
                </div>

            </section>
            <div>
                <ThreeStepSetup />
                <IndustriesServed />
            </div>

            <div>
            <section className="feature-section">
            <h2 className="feature-heading">Your peace of mind is our top priority!</h2>
            <div className="feature-grid">
                {featuresData.map((feature, index) => (
                <div className="feature-card" key={index}>
                    <img src={feature.image} alt={feature.title} />
                    <div>
                    <h3 style={{color:'#fff'}}>{feature.title}</h3>
                    <p>{feature.description}</p>
                    </div>
                </div>
                ))}
            </div>
            </section>
            </div>

            <div>
                <FaqAccordion faqList={faqList} />
            </div>

            <div className="booking-software-main">
                <div className="booking-software">Try Appointy’s online booking software. Get your free account now!</div>
                <div style={{margin:'18px'}}>
                  <button className="explore-btn"><Link to="/services" style={{ textDecoration: 'none', color: 'white' }}>Try Now! →</Link></button>
                  <label className="booking-software"  htmlFor="">Our free plan is free forever. No credit card required!</label>
                </div>
            </div>
        </div>
    )
}

export default Home;