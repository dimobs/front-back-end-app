import secret from "../secret"

export default async function uploadImage(formData) {
    console.log(formData);
    
    // const responseAPI = await fetch(`https://api.cloudinary.com/v1_1/${secret.cloudinary}/image/upload`, {
    //     method:'POST',
    //     body: formData
    // })
    
    // const resultAPI = await responseAPI.json()

    // return resultAPI
}