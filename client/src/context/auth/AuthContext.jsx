import {createContext, useContext, useState} from 'react'
import usePersistedState from '../../hooks/usePersistedState'
import { editUser } from '../../api/auth-api';
import { useError } from '../notification/ErrorContext';

export const AuthContext = createContext({
    userId: "",
    email: "",
    accessToken: "",
    isAuthenticated: false,
    changeAuthState: (authState = {}) => null,
    logout: () => null
});

export function AuthContextProvider(props) {
const [authState, setAuthState] = usePersistedState('auth', {});
const [totalAmount, setTotalAmount] = useState(0);
const [createdUser, setCreatedUser] = useState('createdUser', {})
const {setError} = useError();

const updateUserHandler = async (values) => {
    console.log("Updating user with values:", values);
    let userData = {
     ...values,
        profileImg: 'https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png'
    }

try {
    const response = await editUser(contextData.userId, userData);
      
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
}

const contextData = {
    userId: authState?._id,
    email: authState?.email,
    accessToken: authState?.accessToken,
    isAuthenticated: !!authState?.email,
    totalAmount: totalAmount,
    createdUser,
    updateUserHandler,
    setTotalAmount,
    setCreatedUser,
    changeAuthState,
    logout,
}
    return (
        <AuthContext.Provider value={contextData}>
            {props.children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const authData = useContext(AuthContext);

    return authData;
}