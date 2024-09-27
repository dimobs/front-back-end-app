import {createContext, useContext, useState} from 'react'
import usePersistedState from '../../hooks/usePersistedState'
import { editUser } from '../../api/auth-api';
import { useError } from '../notification/ErrorContext';

export const AuthContext = createContext({
    userId: "",
    email: "",
    accessToken: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    bio: "",
    created: "",
    profileImg: "https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png",
    isAuthenticated: false,
    changeAuthState: (authState = {}) => null,
    logout: () => null
});

export function AuthContextProvider({children}) {
const [authState, setAuthState] = usePersistedState('auth', {});
const [totalAmount, setTotalAmount] = useState(0);
const {setError} = useError();
const [createdUser, setCreatedUser] = useState('createdUser', {})


const updateUserHandler = async (values) => {
    let userData = {
     ...values,
        // profileImg: 'https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png'
    }

try {
    const response = await editUser(contextData.userId, userData);    
    setCreatedUser(response)
return response;
} catch(err){
    console.error(err.message);
    setError(err.message)
}
}

const changeAuthState = (state) => {  
    setAuthState(state)
};

const logout = () => {
     setAuthState({});
     setCreatedUser({})
}

const contextData = {
    userId: authState?._id,
    created: authState?.created,
    email: authState?.email,
    firstName: authState?.firstName,
    lastName: authState?.lastName,
    phoneNumber: authState?.phoneNumber,
    bio: authState?.bio,
    profileImg: authState?.profileImg,
    accessToken: authState?.accessToken,
    isAuthenticated: !!authState?.email,
    totalAmount: totalAmount,
    createdUser,
    setCreatedUser,
    updateUserHandler,
    setTotalAmount,
    changeAuthState,
    logout,
}
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const authData = useContext(AuthContext);

    return authData;
}