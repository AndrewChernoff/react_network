import axios from "axios"
import { useEffect } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import { Dispatch } from "redux"
import { Loader } from "../../common/Loader"
import { AppState } from "../../redux/reducers"
import { setUserAC, UserType } from "../../redux/reducers/profileReducer"
import userAva from "../../imgs/user.png"

type UserProfileType = {
    setUser: (obj: UserType) => void
    userProfile: UserType
}

const UserProfile = ({userProfile, setUser} : UserProfileType) => {

    const params = useParams() as any

    const getData = async (userId: number) => {
        const { data } = await axios.get(
          `https://social-network.samuraijs.com/api/1.0//profile/${userId}`
        );
        return await data;
      };
      
        useEffect(() => {
        getData(params.id)
        .then(data => setUser(data)
        )
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
    setUser: (obj: any) => void
  }
  
  const mapDispatchToProps = (dispatch: Dispatch): MapDispatchType => {
    return {
        setUser: (obj): void => {
            dispatch(setUserAC(obj))
        }
    }
  };
  
  const connector = connect(mapState, mapDispatchToProps)
  

  export default connector(UserProfile)