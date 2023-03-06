import axios from "axios"
import { ComponentType, useEffect } from "react"
import { connect, useSelector } from "react-redux"
import { Navigate, useParams } from "react-router-dom"
import { Loader } from "../../common/Loader"
import { AppState } from "../../redux/reducers"
import { setUser, UserType } from "../../redux/reducers/profileReducer"
import userAva from "../../imgs/user.png"
import { ThunkDispatch } from "redux-thunk"
import { AnyAction, compose } from "redux"
import { withAuthRedirect } from "../../HOC/WithAuthRedirect"

type UserProfileType = {
    setUser: (id: number) => void
    userProfile: UserType
}

const UserProfile = ({userProfile, setUser} : UserProfileType) => {
  //const isAuth = useSelector<AppState>(state => state.auth.isAuth)

    const params = useParams() as any
      
        useEffect(() => {
          setUser(params.id)
        
      }, [])

      console.log(userProfile);

      //if(!isAuth) <Navigate to='login'/>

      if(!userProfile) {
        return <Loader />
    }
      

    return <div>
        <h2>Personal information</h2>
        <img src={userProfile.photos.large? userProfile.photos.large : userAva}/>
            <div> Full name: {userProfile.fullName} </div>
            <div> About me: {userProfile.aboutMe} </div>
            <div> My skills: {userProfile.lookingForAJobDescription} </div>
            <div> Looking for a job: {userProfile.lookingForAJobDescription ? 'yes' : 'no'} </div>
    </div>
}
type MapStateType = {
    userProfile: UserType
  }
  
  const mapState = (state: AppState): MapStateType => ({
    userProfile: state.profile.user
  })

 type MapDispatchType = {
    setUser: (id: number) => void
  }
  
  const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, any, AnyAction>): MapDispatchType => {
    return {
        setUser: (id) => {
            dispatch(setUser(id))
        }
    }
  };
  
  export default compose<ComponentType>(
    connect(mapState, mapDispatchToProps),
    withAuthRedirect
    )(UserProfile)