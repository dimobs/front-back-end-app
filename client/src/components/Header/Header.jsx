// import styles from './Header.module.css';
import logo from '../../assets/images/dimo-favi.png'
export default function Header() {


    return(
        <>
       <header className="header" data-header="">
  <span id="greet" />
  <div className="container">
    <a href="/" className="logo">
      <img
        src={logo}
        width={64}
        height={24}
        alt="Dimo Logo"
      />
    </a>
    <nav className="navbar" data-navbar="">
      <div className="navbar-top">
        <a href="#" className="logo">
          <img
            src="../../assets/images/dimo1.svg"
            width={64}
            height={24}
            alt="Dimo home"
          />
        </a>
        <button
          className="nav-close-btn"
          aria-label="close menu"
          data-nav-toggler=""
        >
          <ion-icon name="close-outline" aria-hidden="true" />
        </button>
      </div>
      <ul className="navbar-list">
        <li>
          <a href="/" className="navbar-link">
            Home
          </a>
        </li>
        <li>
          <a href="/src/pages/about/about.html" className="navbar-link">
            About
          </a>
        </li>
        {/* <li>
      <a href="#" class="navbar-link">Projects</a>
    </li> */}
        <li>
          <a href="src/pages/gitHub/gitHub.html" className="navbar-link">
            GitHub
          </a>
        </li>
        <li>
          <a href="src/pages/education/education.html" className="navbar-link">
            Curriculum
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/dimo-karachorbadzhiev-313418123"
            target="_blank"
            className="navbar-link" rel="noreferrer"
          >
            Linkedin
          </a>
        </li>
      </ul>
      <div className="wrapper">
        <a href="mailto:d_i_m_o@yahoo.com" className="contact-link">
          d_i_m_o@yahoo.com
        </a>
        <a href="tel:+359889670187" className="contact-link">
          +359 (088) 9 67 01 87
        </a>
      </div>
      <ul className="social-list">
        <li>
          <a href="https://github.com/dimobs" className="social-link">
            <ion-icon name="logo-github" />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/dimo-karachorbadzhiev-313418123"
            className="social-link"
          >
            <ion-icon name="logo-linkedin" />
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/profile.php?id=711387305"
            className="social-link"
          >
            <ion-icon name="logo-facebook" />
          </a>
        </li>
        <li>
          <a href="https://portfolio-dimo.web.app/" className="social-link">
            <ion-icon name="logo-dribbble" />
          </a>
        </li>
        {/* <li>
      <a href="#" class="social-link">
        <ion-icon name="logo-instagram"></ion-icon>
      </a>
    </li> */}
        <li>
          <a href="https://www.youtube.com/@zmejbs" className="social-link">
            <ion-icon name="logo-youtube" />
          </a>
        </li>
      </ul>
    </nav>
    <button className="nav-open-btn" aria-label="open menu" data-nav-toggler="">
      <ion-icon name="menu-outline" aria-hidden="true" />
    </button>
    <div className="overlay" data-nav-toggler="" data-overlay="" />
  </div>
  {/* <a onclick="downloadFile()" class="pdf" href="https://firebasestorage.googleapis.com/v0/b/portfolio-dimo.appspot.com/o/DimoYankovKarachorbadzhiev_v04.23.pdf?alt=media&token=357cbdc3-570b-43ef-a283-5703c5d34e6c" target="_blank">DownIoad CV</a> */}
  <button onClick="downloadFile()" className="pdf">
    Download CV
  </button>
</header>

        </>
    )
}

