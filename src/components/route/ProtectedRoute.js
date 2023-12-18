import { Navigate, Outlet } from "react-router-dom";
import { parseToken } from "../../utilities/parseToken";

const ProtectedRoute = ({existeRoles}) => {

    const token = localStorage.getItem("token");

    if(!token)
    {
        return <Navigate to="/login" />
    }

    if(!existeRoles){
        return <Outlet />
    }

    const payload = parseToken(token);

    const {role} = payload;

    if(Array.isArray(role)){
        const isFounded = role.some(ai => existeRoles.includes(ai));
        return isFounded ? <Outlet /> : <Navigate to="/login" />
    }else{
        return existeRoles.includes(role) ? <Outlet /> : <Navigate to="/login" />
    }
};

export default ProtectedRoute;