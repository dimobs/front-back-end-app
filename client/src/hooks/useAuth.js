import { login } from "../api/auth-api";


export const useLogin = () => {
    const loginHandler = async ( email, password) => {
        try {
        const result = await login(email, password);
        console.log(result);
        
        }catch (err) {
                console.error(err.message);
            }
    }

    return loginHandler;
    }