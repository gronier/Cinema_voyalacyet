import React from "react";
import {
    MDBFooter,
    MDBContainer,
} from 'mdb-react-ui-kit';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
const Footer = () => {
    return (
        <MDBFooter className='text-center text-white' style={{ backgroundColor: '#f1f1f1', marginTop: 500}}>
            <MDBContainer className='pt-4'>
                <section className='mb-4'>
                    <div className="social-icons">
                        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" style={{ fontSize: "2rem" ,marginRight :20}}><FaFacebook /></a>
                        <a href="https://twitter.com/" target="_blank" rel="noreferrer" style={{ fontSize: "2rem" ,marginRight :20}}><FaTwitter /></a>
                        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" style={{ fontSize: "2rem",marginRight :20 }}><FaInstagram /></a>
                        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" style={{ fontSize: "2rem" }}><FaLinkedin /></a>
                    </div>
                </section>
            </MDBContainer>
            <div className='text-center text-dark p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2023 Copyright : Voyalacyet Industrie
            </div>
        </MDBFooter>
    );
};
export default Footer;
