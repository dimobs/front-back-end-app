import styles from "./ProfileCSS.module.css";
import useFocus from "../../hooks/useFocus";
import useProfileImgForm from "../../hooks/useProfileImgForm";
import { useContext, useState } from "react";
import { AuthContext, useAuthContext } from "../../context/auth/AuthContext";

const INITIAL_VALUES = {
  first_name: "",
  last_name: "",
  phone_number: "",
  bio: "",
};

const ProfileDetails = () => {
  const inputRef = useFocus();
  const { createdUser, setCreatedUser } = useAuthContext(AuthContext)
  const [showDeleteProfileImgButton, setShowDeleteProfileImgButton] = useState(
    () => {
      return (
        createdUser.profileImg !== "https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png"
      );
    }
  );
  const changeSavedImgState = () => {};

  const changeProfileImgSubmitHandler = () => {};

  const [onChangeImg, onSubmitImg] = useProfileImgForm(
    changeProfileImgSubmitHandler,
    changeSavedImgState,
    createdUser.profileImg
  );

  return (
    <div className={styles["profile__section"]}>
      <div className={styles["profile__body"]}>
        <div className={styles["profile_container"]}>
          <div className={styles["info__section"]}>
            <div className={styles["profile__form"]}>
              <div className={styles["left"]}>
                <div className={styles["img__container"]}>
                  <img
                    src="https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png"
                    alt="user-profile-picture"
                  />
                  <button className={styles["remove-profile-btn"]} onClick>
                    X
                  </button>
                </div>
                <div className={styles["user__info"]}>
                  <p className={styles["name"]}>
                    {`${createdUser.first_name} ${createdUser.last_name}`}
                  </p>

                  <form onSubmit={onSubmitImg}>
                    <div className={styles["field"]}>
                      <label htmlFor="profile-img">Profile Image</label>
                      <input
                        type="file"
                        id="profile_img"
                        name="profileImg"
                        className={styles["choose-file-button"]}
                        onChange={onChangeImg}
                      />
                    </div>

                    <button className={styles["updated-button"]} disabled>
                      <img src="" className={styles["tick"]} alt="tick" />
                      Saved
                    </button>

                    <button className={styles["update-button"]}>Save</button>
                  </form>
                </div>
              </div>
              <div className={styles["right"]}>
                <h3>Account Settings</h3>
                <form onSubmit={onsubmitHandler} action="">
                  <div className={styles["form"]}>
                    <div className={styles["field"]}>
                      <div className={styles[("row", "inputBox")]}>
                        <input
                          type="text"
                          required
                          name="first_name"
                          ref={inputRef}
                          value={values.first_name}
                          onChange={changeHandler}
                        />
                        <span>First Name</span>
                      </div>
                      <div className={styles[("row", "inputBox")]}>
                        <input
                          type="text"
                          required
                          name="last_name"
                          value={values.last_name}
                          onChange={changeHandler}
                        />
                        <span>Last Name</span>
                      </div>
                    </div>
                    <div className={styles[("row", "inputBox")]}>
                      <input
                        type="text"
                        required="false"
                        name="phone_number"
                        value={values.phone_number}
                        onChange={changeHandler}
                      />
                      <span>Phone N:</span>
                    </div>
                    <div className={styles[("row", "inputBox")]}>
                      <input
                        required="false"
                        type="text"
                        name="bio"
                        value={values.bio}
                        onChange={changeHandler}
                      />
                      <span>Bio:</span>
                    </div>
                    <div className="inputBox">
                      <input type="submit" value="Save" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
