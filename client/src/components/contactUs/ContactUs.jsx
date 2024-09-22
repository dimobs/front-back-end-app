import styles from "./ContactUsCSS.module.css";

import whiteTick from "../../assets/white_tick.png";
import { useState } from "react";

const ContactUs = () => {
  const [btnDone, setBtnDone] = useState(false);

  return (
    <div className={styles["contact__section"]}>
      <div className={styles["contact__body"]}>
        <section className={styles["contact__container__top"]}>
          <div className={styles["head__content"]}>
            <h3>Contact Us</h3>
            <p>
              Email us with any questions or inquiries. We would be happy to
              answer your questions and we'll get in touch as soon as we can!
            </p>
          </div>
          <div className={styles["form__info"]}>
            <div className={styles["left"]}>
              <form action="">
                <div className={styles["row"]}>
                  <div className={styles["field"]}>
                    <input type="text" id="name" name="name" />
                    <span>Name:</span>
                  </div>
                  <div className={styles["field"]}>
                    <input type="text" id="subject" name="subject" />
                    <span>Name:</span>
                  </div>
                </div>
                <div className={styles["row"]}>
                  <div className={styles["field"]}>
                    <input type="text" id="email" name="email" />
                    <span>Email:</span>
                  </div>
                  <div className={styles["field"]}>
                    <input type="text" id="phoneNumber" name="phoneNumber" />
                    <span>Phone N:</span>
                  </div>
                </div>
                <div className={styles["message-row"]}>
                  <textarea rows="5" id="message" name="message" />
                  <span>Message:</span>
                </div>
                <div className={styles["inputBox"]}>
                  <input type="submit" value="Send" />
                  {btnDone && (
                    <p>
                      <img
                        src={whiteTick}
                        alt="tick"
                        className={styles["tick"]}
                      />
                      Updated
                    </p>
                  )}
                </div>
              </form>
            </div>
            <div className={styles["right"]}>
            <h3>Contact Information</h3>
            <p>Reach out to us for further communication.</p>
                  <div className={styles['info__container']}>
                    
                  </div>
            </div>
          </div>
        </section>

        <section className={styles["contact__container__bottom"]}>
        
        </section>
      </div>
    </div>
  );
};

export default ContactUs;
