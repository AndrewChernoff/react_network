import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { withAuthRedirect } from "../../HOC/WithAuthRedirect"
import { AppState } from "../../redux/reducers"

const News = () => {
    
    /* const isAuth = useSelector<AppState>(state => state.auth.isAuth)

    if(!isAuth) return <Navigate to='/login'/> */
    
    return <div>
        <h2>News</h2>
    </div>
}

export default withAuthRedirect(News)