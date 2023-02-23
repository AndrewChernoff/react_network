import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { AppState } from "../../../redux/reducers";

const DialogItem = () => {

    const location = useLocation();
    const { state } = location;


    const isAuth = useSelector<AppState>(state => state.auth.isAuth)

    if(!isAuth) return <Navigate to='login'/>


    return <div>
        You are at {state.userName} profile
    </div>
} 

export default DialogItem;