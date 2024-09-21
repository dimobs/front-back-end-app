import { useEffect, useState } from "react";

import styles from "./ProfileCSS.module.css";
import whiteTick from "../../assets/white_tick.png";
import tick from "../../assets/tick.png";

import { useAuthContext } from "../../context/auth/AuthContext";
import { useError } from "../../context/notification/ErrorContext";
import formatDateTime from "../../util/formatDate";
import useFocus from "../../hooks/useFocus";
import { useForm } from "../../hooks/useForm";
import useProfileForm from "../../hooks/useProfileImg";
import useUserProfile from "../../hooks/useUserProfile";

const INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  bio: "",
  createdAt: "",
  profileImg:
    "https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png",
};

const ProfileDetails = () => {
  const inputRef = useFocus();
  const { createdUser, updateUserHandler } = useAuthContext();
  const { fetchFirstData } = useUserProfile(); //in use, do not delete!
  const [btnDone, setBtnDone] = useState(false);
  const [saveProfileImgBtn, setSaveProfileImg] = useState(false);
  const [showDeleteProfileImgButton, setShowDeleteProfileImgButton] = useState(
    () => {
      return (
        createdUser.profileImg !==
        "https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png"
      );
    }
  );
  const { setError } = useError();

  const changeProfileSubmitHandler = async (imgUrl) => {
    const data = {
      profileImg: imgUrl,
    };
    await updateUserHandler(data);
    setSaveProfileImg(true);
  };

  const changeSavedImgState = () => {
    setSaveProfileImg(false);
  };

  const editProfileSubmitHandler = async (values) => {
    await updateUserHandler(values);
    setBtnDone(true);
    setShowDeleteProfileImgButton(true);
    setError("Successfully updated.", "success");
  };

  //edit Profile Data (right side)
  const { values, changeHandler, onsubmitHandler, setValues } = useForm(
    INITIAL_VALUES,
    editProfileSubmitHandler
  );

  useEffect(() => {
    if (createdUser) {
      setValues({
        firstName: createdUser.firstName || "",
        lastName: createdUser.lastName || "",
        phoneNumber: createdUser.phoneNumber || "",
        bio: createdUser.bio || "",
      });
    }
  }, [createdUser, setValues]);

  //edit Profile IMG (left side)
  const [onChangeImg, onSubmitImg] = useProfileForm(
    changeProfileSubmitHandler,
    changeSavedImgState,
    createdUser.profileImg
  );

  const removeProfileImg = () => {
    // setCreatedUser({
    //   ...createdUser,
    //   profileImg: 'https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png'
    // })

    changeProfileSubmitHandler(INITIAL_VALUES.profileImg);
    setShowDeleteProfileImgButton(false);
  };

  return (
    <div className={styles["profile__section"]}>
      <div className={styles["profile__body"]}>
        <div className={styles["profile_container"]}>
          <div className={styles["info__section"]}>
            <div className="table-details">
              <div className="details__view">
                <p>
                  ID: <strong>{createdUser._id}</strong>
                </p>
                <p>
                  User:
                  <strong>{createdUser.email}</strong>
                </p>
                <p>
                  CreatedAt:{" "}
                  <strong>
                    {formatDateTime.dateTime(createdUser.created)}
                  </strong>
                </p>
              </div>
              <div className="details__view">
                <p>
                  First Name:
                  <strong>{createdUser.firstName}</strong>
                </p>
                <p>
                  Last Name:
                  <strong>{createdUser.lastName}</strong>
                </p>
                <p>
                  Phone N: <strong>{createdUser.phoneNumber}</strong>
                </p>
              </div>
              <p>
                Bio: <strong>{createdUser.bio}</strong>
              </p>
            </div>
            <div className={styles["profile__form"]}>
              <div className={styles["left"]}>
                <div className={styles["img__container"]}>
                  <img title={createdUser.firstName}
                    src={createdUser.profileImg || INITIAL_VALUES.profileImg}
                    alt="user-profile-picture"
                  />                  
                    <button 
                      className={styles["remove-profile-btn"]}
                      onClick={removeProfileImg}
                    >
                      X
                    </button>
                  
                </div>
                <div className={styles["user__info"]}>
                  <p className={styles["name"]}></p>

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
                    {saveProfileImgBtn 
                    ? (
                      <button title="Save Img" className={styles["updated-button"]} disabled>
                        <img src={tick} className={styles["tick"]} alt="tick" />
                        Saved
                      </button>
                    ) : (
                      <button title="Save Img" className={styles["update-button"]}>Save</button>
                    )}
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
                          // required={false}
                          name="firstName"
                          ref={inputRef}
                          value={values.firstName}
                          onChange={changeHandler}
                        />
                        <span>First Name</span>
                      </div>
                      <div className={styles[("row", "inputBox")]}>
                        <input
                          type="text"
                          name="lastName"
                          value={values.lastName}
                          onChange={changeHandler}
                        />
                        <span>Last Name</span>
                      </div>
                    </div>
                    <div className={styles[("row", "inputBox")]}>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={values.phoneNumber}
                        onChange={changeHandler}
                      />
                      <span>Phone N:</span>
                    </div>
                    <div className={styles[("row", "inputBox")]}>
                      <input
                        type="text"
                        name="bio"
                        value={values.bio}
                        onChange={changeHandler}
                      />
                      <span>Bio:</span>
                    </div>
                    <div className={styles["inputBox"]}>
                      <input type="submit" value="Update" />
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
