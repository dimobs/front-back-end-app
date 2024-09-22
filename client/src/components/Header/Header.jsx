import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Make sure to create this file
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
        {/* <Link to={'/'}> <img src="logo/dimo-favi.png" alt="Logo" /> </Link> */}
        <Link to={"/"}>
          <img src="logo/dimo-favi.png" alt="Logo"></img>
        </Link>
      </div>
      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <ul>
          <div className="nav__bar">
            <Link to="/">Home</Link>
          </div>
          <div className="nav__bar">
            {isAuthenticated ? (
              <>
                <div className="hasUser">
                  <div className="hasProfile">
                    <Link to="/profile">Profile</Link>
                    <Link to="/table/tableDetails">Details</Link>
                    <Link to="/spinner">Spinner</Link>
                    <Link to="/confirm">confirm</Link>
                    <Link to="/contactUs">Contact Us</Link>
                  </div>
                  {totalAmount >= 0 ? (
                    <div
                      style={{
                        marginLeft: "30px",
                        padding: "5px",
                        background: "rgba(0, 255, 0, 0.05)",
                        opacity: "0.8",
                        borderRadius: "19px",
                        border: "1px solid #2a9d8f",
                      }}
                      className="balance"
                    >
                      <div className="balance__bgn">
                        <span className="balance__label">BGN</span>
                        <span>
                          {totalAmount == "0.00" ? "0.00" : totalAmount}
                        </span>
                      </div>
                      <span className="balance__label__euro">(EUR</span>
                      <span className="balance__label__euro">
                        {totalAmountEuro})
                      </span>
                    </div>
                  ) : (
                    <div
                      style={{
                        marginLeft: "30px",
                        padding: "5px",
                        background: "rgba(255, 0, 0, 0.15)",
                        opacity: "0.8",
                        borderRadius: "19px",
                        border: "1px solid #2a9d8f",
                      }}
                      className="balance"
                    >
                      <div className="balance__bgn">
                        <span className="balance__label">BGN</span>
                        <span>
                          {totalAmount == "0.00" ? "0.00" : totalAmount}
                        </span>
                      </div>
                      <span className="balance__label__euro">(EUR</span>
                      <span className="balance__label__euro">
                        {totalAmountEuro})
                      </span>
                    </div>
                  )}
                  <div className="logout">
                    <Link to="/logout">
                      Logout({email.split("@")[0].toUpperCase()}){" "}
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <div className="nav-bar guest">
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
