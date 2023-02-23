import axios from "axios"
import { useEffect } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import { Loader } from "../../common/Loader"
import { AppState } from "../../redux/reducers"
import { setUser, UserType } from "../../redux/reducers/profileReducer"
import userAva from "../../imgs/user.png"

type UserProfileType = {
    setUser: (id: number) => void
    userProfile: UserType
}

const UserProfile = ({userProfile, setUser} : UserProfileType) => {

    const params = useParams() as any
      
        useEffect(() => {
          setUser(params.id)
        
      }, [])

      console.log(userProfile);

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
    userProfile: UserType///
  }
  
  const mapState = (state: AppState): MapStateType => ({
    userProfile: state.profile.user
  })

 type MapDispatchType = {
    setUser: (id: number) => void
  }
  
  const mapDispatchToProps = (dispatch: any): MapDispatchType => {
    return {
        setUser: (id) => {
            dispatch(setUser(id))
        }
    }
  };
  
  const connector = connect(mapState, mapDispatchToProps)
  

  export default connector(UserProfile)