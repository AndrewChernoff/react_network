import { connect } from "react-redux"
import { Navigate } from "react-router-dom";
import { AppState } from "../redux/reducers"

type MapStateType = {
    isAuth: boolean
}
  export function withAuthRedirect<T>(Component: React.ComponentType<T>) {
  
    const RedirectedComponent = (props: MapStateType) => {
        if(!props.isAuth) return <Navigate to='/login'/>

        return <Component {...props as any} />;
    };
    return connect(mapStatetoProps)(RedirectedComponent);
  }

  const mapStatetoProps = (state: AppState): MapStateType => {
    return {
        isAuth: state.auth.isAuth
    }
}
