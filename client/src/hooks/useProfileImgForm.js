import { useState } from "react";
import uploadImage from "../api/cloudinary/uploadImg";


function useProfileImgForm(submitHandler, changeSavedImgState, initialValue) {

    const [profileImg, setProfileImg] = useState(initialValue);

    const onChangeImg = (e) => {
        const uploadedImg = e.target.files[0];

        setProfileImg(uploadedImg);
        changeSavedImgState();
    }

    const onSubmitImg = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('file', profileImg)
        formData.append('upload_preset', 'profileImg')

        const result = await uploadImage(formData)

        submitHandler(result.url)
    }

    return [
        onChangeImg,
        onSubmitImg
    ]
}

export default useProfileImgForm;