import React, { useState } from 'react';
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
                <a href="/">Home</a>
                <a href="/login">Login</a>
                <a href="/logout">Logout</a>
                <a href="/profile">Profile</a>
            </nav>
            <div className="menu-toggle" onClick={toggleMenu}>
                <span className="menu-icon"></span>
            </div>
        </header>
    );
};

export default Header;