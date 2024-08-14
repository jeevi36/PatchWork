<<<<<<< HEAD
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

=======
import React, { useState, useRef } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import logo from '../Images/image.png';

function Navbar() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const navigate = useNavigate();
    const navRef = useRef();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
     // Mock function to handle login (replace with real logic)
     const handleLogin = () => {
        setLoggedIn(true);
        setDropdownOpen(false); // Close dropdown on login
        navigate('/login'); // Navigate to the login page
    };

    // Mock function to handle logout
    const handleLogout = () => {
        setLoggedIn(false);
        setDropdownOpen(false); // Close dropdown after logout
        // Perform any other logout-related actions here, like clearing tokens
    };
>>>>>>> e84ea8e (Initial commit of my React Project)
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
<<<<<<< HEAD
            <div className="right-container">
                <div className="book-now-btn">
                    <Link to='/login'>Login / SignUp</Link>
                </div>
                <div className="admin-icon">
                    <Link to='/adminlogin'>
                        <FontAwesomeIcon icon={faUserShield} size="lg" className="dash-image" />
                    </Link>
                </div>
=======
            
            
            <div className="Rina_7 profile-menu">
                <FontAwesomeIcon 
                    icon={faUserCircle} 
                    size="2x" 
                    className="Rina_5 profile-icon" 
                    onClick={toggleDropdown} 
                    aria-label="User Menu"
                />
                {dropdownOpen && (
                    <div className="Rina_8 dropdown-menu">
                        {loggedIn ? (
                            <NavLink 
                                to="/" 
                                className="Rina_5 dropdown-item" 
                                activeClassName="active" 
                                onClick={handleLogout}>
                                Logout
                            </NavLink>
                        ) : (
                            <NavLink 
                                to="/login" 
                                className="Rina_5 dropdown-item" 
                                activeClassName="active" 
                                onClick={handleLogin}>
                                Login / Signup
                            </NavLink>
                            
                        )}
                    </div>
                )}
>>>>>>> e84ea8e (Initial commit of my React Project)
            </div>
        </header>
    );
}

export default Navbar;
