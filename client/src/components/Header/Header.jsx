import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Make sure to create this file

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="header">
            <div className="logo">
                <img src="path_to_logo.png" alt="Logo" /> {/* Replace with your logo */}
            </div>
            <nav className={`nav ${menuOpen ? 'open' : ''}`}>
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/table/tableDetails">Details</Link>              
            </nav>
            <nav className={`nav ${menuOpen ? 'open' : ''}`}>
                <Link to="/logout">Logout</Link>
                <Link to="/login">Login</Link>
            </nav>
            <div className="menu-toggle" onClick={toggleMenu}>
                <span className="menu-icon"></span>
            </div>
        </header>
    );
};

export default Header;