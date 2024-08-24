import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Make sure to create this file
import { useAuthContext } from '../../context/AuthContext';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const {isAuthenticated, email} = useAuthContext();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="header">
            <div className="logo">
               <Link to={'/'}> <img src="../../../public/logo/dimo-favi.png" alt="Logo" /> {/* Replace with your logo */}</Link>
            </div>
            <nav className={`nav ${menuOpen ? 'open' : ''}`}>
                <ul>
                <div className='nav__bar'>
               <Link to="/">Home</Link>
               </div>
                <div className='nav__bar'>
                {isAuthenticated
                ? (
                   <>
                    <div className='hasUser'>
                                    <Link to="/profile">Profile</Link>
                                    <Link to="/table/tableDetails">Details</Link>
                                    <Link to="/spinner">Spinner</Link>
                                    <Link to="/confirm">confirm</Link>
                                <div>
                                
                                        <Link style={{marginLeft: "15rem"}} to="/logout">Logout({email.split('@')[0].toUpperCase()}) </Link>
                                    </div>                    
                                </div>
                                </>
                )            
                :(
                <div className='nav-bar guest'>
               <Link to="/login">Login</Link>
               <Link to="/register">Register</Link>
                </div>
            )}
                </div>
                </ul>
            </nav>
                <div className="menu-toggle" onClick={toggleMenu}>
                <span className="menu-icon"></span>
                </div>
            {/* <nav className={`nav ${menuOpen ? 'open' : ''}`}>
                <Link to="/logout">Logout</Link>
            </nav> */}
    
            <div className="menu-toggle" onClick={toggleMenu}>
                <span className="menu-icon"></span>
            </div>
        </header>
    );
};

export default Header;