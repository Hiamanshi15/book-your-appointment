import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Shared-Components/Header/Header';
import Footer from './Shared-Components/Footer/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
// import Team from './pages/Team';
import Contact from './pages/Contact';
import SignUpLogin from './Auth/Signin';
import AddService from './pages/Addservice';
import ServiceProviderDetails from './pages/serviceProviderDetails';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import MyAppointments from './pages/MyAppointments';
import ScrollToTop from './ScrollToTop';

function App() {
  return (
    <Router>
      <div className="App">
       <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          {/* <Route path="/team" element={<Team />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/signUpLogin" element={<SignUpLogin />} />
          <Route path="/AddService" element={<AddService />} />
          <Route path="/provider/:id" element={<ServiceProviderDetails />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="/myappointments" element={<MyAppointments />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
