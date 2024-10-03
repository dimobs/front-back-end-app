import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useAuthContext } from "../../context/auth/AuthContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, email, totalAmount } = useAuthContext();
  const totalAmountEuro = (totalAmount / 1.95583).toFixed(2);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src="logo/dimo-favi.png" alt="Logo" />
        </Link>
      </div>

      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <ul>
          <li className="nav__bar">
            <Link to="/">Home</Link>
          </li>
          {isAuthenticated ? (
            <li className="hasUser">
              <Link to="/profile">Profile</Link>
              <Link to="/table/tableDetails">Details</Link>
              <Link to="/spinner">Spinner</Link>
              <Link to="/contactUs">Contact Us</Link>

              <div className="balance">
                <span className="balance__label">BGN</span>
                <span>{totalAmount === "0.00" ? "0.00" : totalAmount}</span>
                <span className="balance__label__euro">(EUR {totalAmountEuro})</span>
              </div>

              <div className="logout">
                <Link to="/logout">Logout({email.split("@")[0].toUpperCase()})</Link>
              </div>
            </li>
          ) : (
            <li className="guest">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              <Link to="/contactUs">Contact Us</Link>
            </li>
          )}
        </ul>
      </nav>

      {/* Menu Toggle */}
      <div className="menu-toggle" onClick={toggleMenu}>
        <span className="menu-icon">Home</span>
        <span className="menu-icon">Profile</span>
        <span className="menu-icon">Contact Us</span>
      </div>
    </header>
  );
};

export default Header;
