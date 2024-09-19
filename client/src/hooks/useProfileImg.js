import { useState } from "react"

import uploadImage from "../api/cloudinary/uploadImg";

const useProfileForm = (submitHandler, changeSavedImgHandler, initialValue) => {
    const [ profileImg, setProfileImg] = useState(initialValue);

    const onChangeImg = (e) => {
        const uploadedImg = e.target.files[0]

        setProfileImg(uploadedImg);
        changeSavedImgHandler();
    }

    const onSubmitImg = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('file', profileImg)
        formData.append('upload_preset', "dr1lxrsgy")

        const result = await uploadImage(formData)

        submitHandler(result.url);
    }

    return [
        onChangeImg,
        onSubmitImg
    ]
}

export default useProfileForm;