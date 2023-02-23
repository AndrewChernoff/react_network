import React from "react"
import { connect } from "react-redux"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { AppState } from "../../redux/reducers"
import { setUserAuthorizedUserThunk } from "../../redux/reducers/authReducer"
import Header from "./Header"

type MapStateType = {
    isAuth: boolean
    id: number | null
}

type MapDispatchType = {
    setUserAuthorizedUser: () => void
}

type PropsType = MapDispatchType & MapStateType

class HeaderContainer extends React.Component<PropsType>  {
    componentDidMount(): void {
        this.props.setUserAuthorizedUser()
    }

   render() {
    return <Header isAuth={this.props.isAuth} userId={this.props.id}/>
   }
}

const mapStateToProps = (state: AppState): MapStateType => {
    return {
        isAuth: state.auth.isAuth,
        id: state.auth.id
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, any, AnyAction> ): MapDispatchType => {
    return {
        setUserAuthorizedUser: () => dispatch(setUserAuthorizedUserThunk())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)