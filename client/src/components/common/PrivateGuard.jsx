import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/auth/AuthContext";


export default function PrivateGuard() {
    const {isAuthenticated} = useAuthContext();

    return isAuthenticated
    ? <Outlet />
    : <Navigate to='/login' />;
}