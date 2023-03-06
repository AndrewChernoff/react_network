import { ComponentType } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { compose } from "redux";
import { withAuthRedirect } from "../../../HOC/WithAuthRedirect";
import { AppState } from "../../../redux/reducers";

const DialogItem = () => {
    const location = useLocation();
    const { state } = location;

    return <div>
        You are at {state.userName} profile
    </div>
} 

export default compose<ComponentType>(withAuthRedirect)(DialogItem);