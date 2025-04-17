/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './Footer.css';
import Logo from '../../Assets/img/logo-removebg-preview.png';
import { Link } from 'react-router-dom';

export default function App() {
    return (
        <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
            <section className='footer-main'>
                <MDBContainer className='text-center text-md-start mt-5'>
                    <div className='footer-top'>
                        <MDBRow className='mt-3'>
                            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
                                <Link to="/"> 
                                  <img src={Logo} className="App-logo" alt="logo" />
                                </Link>
                                <p className='justify-content-center text-reset'>
                                    BookYourAppointment.com
                                </p>

                                <section className=''>
                                    <div>
                                        <a href='' className='me-4 text-reset'>
                                            <MDBIcon color='white' fab icon='facebook-f' />
                                        </a>
                                        <a href='' className='me-4 text-reset'>
                                            <MDBIcon color='white' fab icon='twitter' />
                                        </a>
                                        <a href='' className='me-4 text-reset'>
                                            <MDBIcon color='white' fab icon='google' />
                                        </a>
                                        <a href='' className='me-4 text-reset'>
                                            <MDBIcon color='white' fab icon='instagram' />
                                        </a>
                                        <a href='' className='me-4 text-reset'>
                                            <MDBIcon color='white' fab icon='linkedin' />
                                        </a>
                                       
                                    </div>

                                </section>
                            </MDBCol>

                            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4 fprod'>
                                <h6 className='text-uppercase fw-bold mb-4'>Menu</h6>

                                <p>
                                    <Link to="/about" className='text-reset'>About</Link>
                                </p>
                                <p>
                                    <Link to="/services" className='text-reset'>Services</Link>
                                </p>
                                <p>
                                    <Link to="/contact" className='text-reset'>Contact</Link>
                                </p>
                                {/* <p>
                                    <Link to="/team" className='text-reset'>Our Team</Link>
                                </p> */}
                                <p>
                                    <Link to="/privacy-policy" className='text-reset'>Privacy Policy</Link>
                                </p>
                                <p>
                                    <Link to="/terms-and-conditions" className='text-reset'>Terms & Conditions</Link>
                                </p>
                            </MDBCol>



                            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                                <p className='text-reset'>
                                    <MDBIcon color='white' icon='home' className='me-2 text-reset' />Jai Singh Pura Ujjain
                                </p>
                                <p className='text-reset'>
                                    <MDBIcon color='white' icon='envelope' className='me-2 text-reset' />BookYourAppointment.com
                                </p>
                                <p className='text-reset'>
                                    <MDBIcon color='white' icon='phone' className='me-2 text-reset' />+ 01 234 567 88
                                </p>
                                <p className='text-reset'>
                                    <MDBIcon color='white' icon='print' className='me-2 text-reset' />+ 01 234 567 89
                                </p>
                            </MDBCol>
                        </MDBRow>
                    </div>
                </MDBContainer>
            </section>

            <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2021 Copyright:&nbsp;
                <a  className='text-reset fw-bold class-imp' href='/#'>
                    BookYourAppointment.com
                </a>
            </div>
        </MDBFooter>
    );
}