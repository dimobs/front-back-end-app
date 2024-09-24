import { useEffect } from "react";

import { useAuthContext } from "../context/auth/AuthContext";
import { useError } from "../context/notification/ErrorContext";
import { useLoading } from "../context/spinner/SpinnerContext";
import { userInfo } from "../api/auth-api";


const useUserProfile = () => {
    const {userId, setCreatedUser} = useAuthContext();
    const {setError} = useError();
   const {setLoading} = useLoading();

   const fetchUserProfile = async () => {
    try {        
        setLoading(true);   
        const response = await userInfo(userId);
        setCreatedUser(response)   
    }catch (err) {
        console.log(err.message)
        setError(`Failed to load profile data. Server said: ${err.message}`);
    }finally {
        setLoading(false);
    }
   }

   useEffect(() => {
    if(userId) {
        fetchUserProfile();
    } 
   }, [userId]);

   return { fetchUserProfile };
}

export default useUserProfile;