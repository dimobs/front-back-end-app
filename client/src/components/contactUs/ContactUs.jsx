import styles from "./ContactUsCSS.module.css";
const ContactUs = () => {
  return (
    <div className={styles["contact__section"]}>
      <div className={styles["contact__body"]}>
        <section className={styles["contact__container__top"]}>
          <div className={styles["head__content"]}>
            <h2>Contact Us</h2>
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
                    <input 
                    type="text"
                    id="name"
                    name=""                    
                    />
                    <span>Name:</span>
                  </div>
                </div>
              </form>
            </div>
            <div className={styles["right"]}></div>
          </div>
        </section>

        <section className={styles["contact__container__bottom"]}>
          <h3>Hello</h3>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;
