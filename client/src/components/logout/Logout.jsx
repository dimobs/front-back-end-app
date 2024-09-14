import { Navigate } from "react-router-dom"
import { useLogout } from "../../hooks/useAuth";
import { useError } from "../../context/notification/ErrorContext";

export default function Logout() {
    const logout = useLogout();
    const {setError} = useError();

    logout();
    setError("Good bye", 'success' )


return <Navigate to={'/'} />
}