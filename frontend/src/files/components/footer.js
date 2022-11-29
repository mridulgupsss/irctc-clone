import React from "react";

import '../files.css'
import './footer.css'

function Footer() {
    return (
        <footer className="footer_main">
            <div className="footer_content">
                <div className="footer_flex left">
                    <h2>Indian Railways</h2>
                    <h5>Saftey | Security | Punctuality</h5>
                </div>
                <div className="footer_flex right">
                    <p>IRCTC Trains</p>
                    <p>General Information</p>
                    <p>Agents</p>
                </div>
                <div className="footer_flex right">
                    <p>Refund Rules</p>
                    <p>Advertise with us</p>
                    <p>Enquiries</p>
                </div>
                <div className="footer_flex right">
                    <p>About Us</p>
                    <p>Career</p>
                    <p>Press</p>
                </div>
            </div>
            <div className="footer_end">
                <div className="footer_flex">
                    Copyright Ⓒ 2022 IROR All Rights Reserved
                </div>
                <div className="footer_flex right">
                    Designed and Developed with ♥
                </div>
            </div>
        </footer>
    );
}

export default Footer;