import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import {Navigate} from "react-router-dom";
const ProtectedRoute = ({children})=>{
    const {token} = useContext(AuthContext);
     if(!token){
        return <Navigate to={"/login"} replace/>
     }
     // si l'utilisateur est connecté, on retourne l'enfant
     return children;

}

export default ProtectedRoute;