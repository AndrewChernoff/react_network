import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { AppState } from "../../redux/reducers"

const Settings = () => {
    const isAuth = useSelector<AppState>(state => state.auth.isAuth)

    if(!isAuth) return <Navigate to='/login'/>

    return <div>
        <h2>Settings</h2>
    </div>
}

export default Settings