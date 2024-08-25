
import { login, register, logout } from "../api/auth-api";
import { useAuthContext } from "../context/AuthContext";


export const useLogin = () => {
    const {changeAuthState} = useAuthContext();
    
    const loginHandler = async (email, password) => {
        console.log(email, password, 'useAuth....');
        
        const {...authData} = await login(email, password);

       changeAuthState(authData);

       return authData;
    }

    return loginHandler;
}

export const useRegister = () => {
    const {changeAuthState} = useAuthContext();
    const registerHandler = async (email, password) => {
        const [...authData] = await register(email, password);

        changeAuthState(authData)
        return authData;
    }

    return registerHandler;
};

export const useLogout = () => {
    const {logout: localLogout} = useAuthContext();

    const logoutHandler = async () => {
        localLogout();
        await logout();
    };

    return logoutHandler;
}