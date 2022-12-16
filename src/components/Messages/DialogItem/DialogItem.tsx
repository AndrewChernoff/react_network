import { useLocation } from "react-router-dom";

const DialogItem = () => {

    const location = useLocation();
    const { state } = location;


    console.log(location)

    return <div>
        You are at {state.userName} profile
    </div>
} 

export default DialogItem;