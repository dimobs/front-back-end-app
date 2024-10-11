import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Make sure to create this file
import { useAuthContext } from "../../context/auth/AuthContext";
import menu__mob from "../../assets/svg/manu__mobile.svg";
import search_mob from "../../assets/svg/search-svgrepo-com.svg";
import homeBtn from "../../assets/svg/home-icon-silhouette-svgrepo-com.svg";
import profileIcon from "../../assets/svg/profile-round-1342-svgrepo-com.svg";
import contactUsIcon from "../../assets/svg/contact-phonebook-support-svgrepo-com.svg";
import logoutIcon from "../../assets/svg/logout-svgrepo-com.svg";
import loginIcon from "../../assets/svg/login-svgrepo-com.svg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, email, totalAmount } = useAuthContext();
  const totalAmountEuro = (totalAmount / 1.95583).toFixed(2);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const closeModal = () => {
    setMenuOpen(!menuOpen)
  }

  const toggleSearch = () => {
    let myDiv = document.querySelector(".search__input");
    if (myDiv.style.display == "none") {
      myDiv.style.display = "block";    
    } else {
      myDiv.style.display = "none";    
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to={"/"}>
          <img src="logo/dimo-favi.png" alt="Logo"></img>
        </Link>
      </div>

      {/* <nav className={`nav ${menuOpen ? "open" : ""}`}> */}
      <ul className="nav">
        <div className="nav__bar">
          <Link to="/">Home</Link>
        </div>
        <div className="nav__bar">
          {isAuthenticated ? (
            <>
              <div className="hasUser">
                <div className="hasProfile">
                  <Link to="/profile">Profile</Link>
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
              <Link to="/contactUs">Contact Us</Link>
            </div>
          )}
        </div>
      </ul>
      <div className="menu-toggle" onClick={toggleMenu}>
        <img className="menu-mobile" src={menu__mob} alt="menu" />
      </div>

      <div className="sidebar">
        <div className="menu-bar">
          <div className="menu">
            {/* {showSearch && (
                  <div style={{display: "block"}} className="search__input"></div>
                  
              )} */}
            <li className="search-box nav-link">
              <img
                onClick={toggleSearch}
                className="icon"
                src={search_mob}
                alt="Search"
              />
            </li>
            <li className="nav-link"    
            >                      
              <Link to="/">
                <img src={homeBtn} alt="Home" />
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/profile">
                <img src={profileIcon} alt="profile" />
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/contactUs">
                <img src={contactUsIcon} alt="Contact-Us" />
              </Link>
            </li>
            {isAuthenticated ? (
              <li className="nav-link">
                <Link to="/logout">
                  <img src={logoutIcon} alt="Logout" />
                </Link>
              </li>
            ) : (
              <li className="nav-link">
                <Link to="/login">
                  <img src={loginIcon} alt="Login" />
                </Link>
              </li>
            )}
          </div>
        </div>
      </div>
      {menuOpen && (
        <dir className="menu_overlay">
          <ul>
            <li className="nav-bar-mob">
              <Link to={"/"}>
                <div className="atr_link" onClick={closeModal}>
                  <img src={homeBtn} alt="Home" className="icon" />
                  <span>Home</span>
                </div>
              </Link>
            </li>
            <li onClick={toggleSearch}>
            <div className="atr_link" onClick={closeModal}>
                <img  src={search_mob} alt="Search..." className="icon" />
                <span>Search</span>
              </div>
            </li>
            {isAuthenticated && (
              <li className="nav-bar-mob">
                <Link to={"/profile"}>
                  <div className="atr_link" onClick={closeModal}>
                    <img src={profileIcon} alt="Profile" className="icon" />
                    <span>Profile</span>
                  </div>
                </Link>
              </li>
            )}
            <li className="nav-bar-mob">
              <Link to={"/contactUs"}>
                <div className="atr_link" onClick={closeModal}>
                  <img src={contactUsIcon} alt="Contact Us" className="icon" />
                  <span>Contact Us</span>
                </div>
              </Link>
            </li>
            {isAuthenticated ? (
              <li>
                <Link to={'/logout'}>
                  <div className="atr_link" onClick={closeModal}>
                    <img src={loginIcon} alt="Logout" className="icon" />
                    <span>Logout</span>
                  </div>
                </Link>
              </li>
            ) : (
              <li>Log in</li>
            )}
          </ul>
        </dir>
      )}
    </header>
  );
};

export default Header;
