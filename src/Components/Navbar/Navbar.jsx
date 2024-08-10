import React, { useRef } from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';
import logo from '../Images/image.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    };

    return (
        <header>
            <img src={logo} className='logo' alt="Logo" />
            <nav ref={navRef}>
                <Link to='/'>Home</Link>
                <Link to='/about'>About us</Link>
                <Link to='/service'>Services</Link>
                <Link to='/contact'>Book a Service</Link>
                <Link to='/blog'>Blog</Link>
                <Link to='/payment'>Payment</Link>
            </nav>
            <div className="right-container">
                <div className="book-now-btn">
                    <Link to='/login'>Login / SignUp</Link>
                </div>
                <div className="admin-icon">
                    <Link to='/adminlogin'>
                        <FontAwesomeIcon icon={faUserShield} size="lg" className="dash-image" />
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
