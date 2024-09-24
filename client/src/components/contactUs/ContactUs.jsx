import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./ContactUsCSS.module.css";

import useScrollToTop from "../../hooks/scrollToTop";
import useFocus from "../../hooks/useFocus";
import whiteTick from "../../assets/white_tick.png";
import phoneIcon from "../../assets/phone_icon.png";
import emailIcon from "../../assets/email_icon.png";
import mapIcon from "../../assets/map_icon.png";
import githubIcon from "../../assets/github_icon.png";
import linkedInIcon from "../../assets/linkedin_icon.png";
import facebookIcon from "../../assets/facebook_icon.png";
import { useError } from "../../context/notification/ErrorContext";
import { useAuthContext } from "../../context/auth/AuthContext";
import { useForm } from "../../hooks/useForm";
import useUserProfile from "../../hooks/useUserProfile";
import { useLoading } from "../../context/spinner/SpinnerContext";
import { sendEmail } from "../../api/email-api";

const INITIAL_VALUES = {
  name: "",
  message: "",
  email: "",
  subject: "",
  phoneNumber: "",
};

const ContactUs = () => {
  const { createdUser } = useAuthContext();
  useUserProfile();
  // useScrollToTop();
  const { setError } = useError();
  const inputRef = useFocus();
  const [btnDone, setBtnDone] = useState(false);
  const mapOfficePosition = [42.495957, 27.463984];
  const {setLoading} = useLoading();
  const sendEmailHandler = async (values) => {
    console.log(values.name, 'values');
    
    if (!values.email || !values.subject){
      setError('Please fill form correctly')
      return
    }
    try {
      await sendEmail(values)
      setLoading(true);
      setBtnDone(true);
      setError('Your message has been sent successfully!', 'success');
    }catch (err) {
      setError(err.message)
      console.log(err.message);
      
    }finally {
      setLoading(false);
    }
  };

  const { values, changeHandler, onsubmitHandler, setValues } = useForm(
    INITIAL_VALUES,
    sendEmailHandler
  );

  useEffect(() => {
    if (createdUser) {
      let fullName = "";
      if (createdUser.firstName) {
        fullName += createdUser.firstName
      }
      if (createdUser.lastName) {
        fullName += ` ${createdUser.lastName}`
      }
      setValues({
        name: fullName || "",
        subject: "",
        phoneNumber: createdUser.phoneNumber || "",
        email: createdUser.email || "",
      });
    }
  }, [createdUser, setValues]);

  return (
    <div className={styles["contact__section"]}>
      <div className={styles["contact__body"]}>
        <section className={styles["contact__container"]}>
          <div className={styles["head__content"]}>
            <h3>Contact Us</h3>
            <p>
              Email us with any questions or inquiries. We would be happy to
              answer your questions and we'll get in touch as soon as we can!
            </p>
          </div>
          <div className={styles["form__info"]}>
            <div className={styles["left"]}>
              <form onSubmit={onsubmitHandler} action="">
                <div className={styles["row"]}>
                  <div className={styles["field"]}>
                    <input
                      ref={inputRef}
                      type="text"
                      id="name"
                      name="name"
                      value={values.name}
                      onChange={changeHandler}
                    />
                    <span>Name:</span>
                  </div>
                  <div className={styles["field"]}>
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={values.phoneNumber}
                      onChange={changeHandler}
                    />
                    <span>Phone N:</span>
                  </div>
                </div>
                <div className={styles["row"]}>
                  <div className={styles["field"]}>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={values.email}
                      onChange={changeHandler}
                    />
                    <span>Email:</span>
                  </div>               
                  <div className={styles["field"]}>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={values.subject}
                      onChange={changeHandler}
                    />
                    <span>Subject:</span>
                  </div>
                </div>
                <div className={styles["message-row"]}>
                  <textarea
                    rows="5"
                    id="message"
                    name="message"
                    value={values.message}
                    onChange={changeHandler}
                  />
                  <span>Message:</span>
                </div>
                <div className={styles["inputBox"]}>
                  <input type="submit" value="Send" />
                  {btnDone && (
                    <p className={styles['tick_container']}>
                      <img
                        className={styles["tick"]}
                        src={whiteTick}
                        alt="tick"
                      />
                      <span>Sent</span>
                    </p>
                  )}
                </div>
              </form>
            </div>
            <div className={styles["right"]}>
              <div>
                <h3>Contact Information</h3>
                <p>Reach out to us for further communication.</p>
              </div>
              <div className={styles["info__container"]}>
                <div className={styles["one__section"]}>
                  <div className={styles["img__container"]}>
                    <img src={phoneIcon} alt="phone" />
                  </div>
                  <p>+359 889 670 187</p>
                </div>
                <div className={styles["one__section"]}>
                  <div className={styles["img__container"]}>
                    <img src={emailIcon} alt="email" />
                  </div>
                  <p>d_i_m_o@yahoo.com</p>
                </div>
                <div className={styles["one__section"]}>
                  <div className={styles["img__container"]}>
                    <img src={mapIcon} alt="email" />
                  </div>
                  <p>8000 Burgas, Bulgaria</p>
                </div>
              </div>
              <div className={styles["follow-us"]}>
                <h3>Follow Us:</h3>
                <div className={styles["socials"]}>
                  <Link to={"https://github.com/dimobs"} target="_blank">
                    <img src={githubIcon} alt="github" />
                  </Link>
                  <Link
                    to={
                      "https://www.linkedin.com/in/dimo-karachorbadzhiev-313418123/"
                    }
                    target="_blank"
                  >
                    <img src={linkedInIcon} alt="linkedin" />
                  </Link>
                  <Link
                    to={"https://www.facebook.com/profile.php?id=711387305"}
                    target="_blank"
                  >
                    <img src={facebookIcon} alt="facebook" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={styles["contact__container"]}>
          <h2>Where are we located?</h2>
          <p>Coordinates - 42.495957, 27.463984</p>
          <section className={styles["mapbox"]}>
            <figure>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d94091.20059984463!2d27.369564838250586!3d42.52661894732471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a69266f9fc9d91%3A0x400a01269bf4df0!2z0JHRg9GA0LPQsNGB!5e0!3m2!1sbg!2sbg!4v1681471808118!5m2!1sbg!2sbg"
                width={750}
                height={300}
                loading="lazy"
              ></iframe>
              <map name="workmap">
                <area
                  shape="circle"
                  coords="290, 172, 333, 250"
                  href=""
                  alt="Office"
                  style={{
                    background: "red",
                    zIndex: "100",
                    width: "50px",
                    height: "100px",
                  }}
                />
                <div className={styles["radar__dot"]}></div>
              </map>
            </figure>
          </section>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;
