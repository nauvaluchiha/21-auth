import { auth } from "@/utils/auth"
import { Outlet, Navigate } from "react-router-dom"
export default function PrivateRoute() {
    if(auth.isAuthenticated()){
        return <Outlet />
    }
    return <Navigate to="/login" replace />
}
