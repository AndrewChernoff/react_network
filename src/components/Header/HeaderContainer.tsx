import axios from "axios"
import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { AppState } from "../../redux/reducers"
import { AuthDataType, setUserAuthorizedUserAC } from "../../redux/reducers/authReducer"
import API from "../../services/API"
import Header from "./Header"

type MapStateType = {
    isAuth: boolean
    id: number | null
}

type MapDispatchType = {
    setUserAuthorizedUser: (obj:AuthDataType) => void
}

type PropsType = MapDispatchType & MapStateType

class HeaderContainer extends React.Component<PropsType>  {
    constructor(props: PropsType) {
        super(props);
        this.state = {userId: null};
      }

    componentDidMount(): void {
        API.authMe()
        .then(data => this.props.setUserAuthorizedUser(data.data))
        .then(() => {
            if(this.props.id) {
                this.setState({
                    userId: this.props.id
                  });
            }
        })
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

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchType => {
    return {
        setUserAuthorizedUser: (obj) => dispatch(setUserAuthorizedUserAC(obj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)