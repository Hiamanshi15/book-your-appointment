import React from "react";
import "./ThreeStepSetup.css"; // Optional: for scoped styling
import Step1Img from "../Assets/images/Customer-selecting-an-empty-slot.svg";
import Step2Img from "../Assets/images/Business-owner-sharing-his-booking-link-to-customers.svg";
import Step3Img from "../Assets/images/Customer-rescheduling-or-cancelling-his-appointment.svg";


const steps = [
  {
    title: "Step 1: Set your availability. Booking rules make it simple and flexible",
    text: "Simply enter the available services and working hours for you and your staff for your booking page to be ready. Add buffers, block-times, or irregular available hours to replicate your real-life schedule. No double bookings!",
    img: Step1Img,
    imgWidth: 146,
    imgHeight: 126,
  },
  {
    title: "Step 2: Share your booking link with your customers or embed it",
    text: "Share your online appointment booking page URL with your customers in emails, texts, brochures, etc. Start accepting appointments on your website by integrating Appointy’s booking widget on it. Add ‘Book Now’ button on your Facebook, Instagram and Google My Business pages",
    img: Step2Img,
    imgWidth: 254,
    imgHeight: 137,
  },
  {
    title: "Step 3: Accept online bookings hassle-free 24x7 (55% people book outside business hours)!",
    text: "Give customers the convenience to self schedule, cancel, reschedule and book recurring appointments using Appointy’s 24×7 online booking software. Send automated email and text reminders before appointments and reduce no-shows",
    img: Step3Img,
    imgWidth: 190,
    imgHeight: 180,
  }
];

const ThreeStepSetup = () => {
  return (
    <section className="three-step-section">
      <div className="container text-center py-5">
        <h2 className="mb-5" >
          Online appointment booking made simple with a 3-step setup process
        </h2>

        {steps.map((step, index) => (
          <div className="row align-items-center mb-5" key={index}>
            <div className="col-md-5 mb-3 mb-md-0 text-center">
              <img
                src={step.img}
                width={step.imgWidth}
                height={step.imgHeight}
                alt={`Step ${index + 1}`}
              />
            </div>
            <div className="col-md-6 text-left">
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ThreeStepSetup;
