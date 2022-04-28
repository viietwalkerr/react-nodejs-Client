import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Footer.scss";

const Footer = ({}) => {
    return (
        <div className='footer'>
            <div className='footer-container'>
                <div className='footer-container__about-us'>
                    <h2>About Us</h2>
                    <p>illumin8 is a Web Application that was created using React and NodeJS.
                    </p>
                    <ul className='social'>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <div className='footer-container__quick-links'>
                    <h2>Quick Links</h2>
                    <ul>
                        <li><NavLink to="/about">About</NavLink></li>
                        <li>FAQ</li>
                        <li>Privacy Policy</li>
                        <li>Help</li>
                        <li>Terms & Conditions</li>
                        <li>Contact</li>
                    </ul>
                </div>
                <div className='footer-container__contact'>
                    <h2>Contact Info</h2>
                    <ul className='info'>
                        <li className='info__address'>
                            <span><i className=''></i></span>
                            <span>369 Australia Street,
                                Australia,
                                AUS
                            </span>
                        </li>
                        <li className='info__phone'>
                            <span><i className=''></i></span>
                            <p>
                                +61 0400123456
                            </p>
                        </li>
                        <li className='info__mail'>
                            <span><i className=''></i></span>
                            <p>placeholder@hotmail.com</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='copyright'>

            </div>
        </div>
    )
}

export default Footer;