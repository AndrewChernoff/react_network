import { ComponentType, useEffect, useState } from "react";
import { connect } from "react-redux";
import { AnyAction, compose } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { withAuthRedirect } from "../../HOC/WithAuthRedirect";
import { AppState } from "../../redux/reducers";
import { addPost, PostsType, setErrorAC, setUser, setUserStatus, updateStatus, updateUserInfo, UserType } from "../../redux/reducers/profileReducer";
import Profile from "./Profile";
import { UserContactValues } from "./ProfileFormInfo/ProfileFormInfo";
import { useParams } from "react-router-dom";
import { StateType } from "../../redux/reducers/appReducer";

type PropsType = MapStateType & MapDispatchType

export type MapStateType = {
  posts: PostsType[]
  user: UserType
  authId: number | null
  status: string
  error: string | null
}

export type MapDispatchType = {
addPost: (obj: PostsType) => void
setUser: (id: number) => void
setStatus: (userId: number) => void
updateStatus: (status: string) => void
updateUserInfo: (info: UserContactValues) => void
setError: (message: string | null) => void
}

const ProfileContainer = ({setUser, setStatus, authId, addPost, posts, user, status,
  updateStatus, updateUserInfo, setError, error}: PropsType) => {
  
    const {id} = useParams();
  
    useEffect(() => {
      if(id) {
          setUser(+id)
          setStatus(+id)
      } else {
        if(authId) {
          setUser(authId)
          setStatus(authId)
        }
      }
    }, [id])

    const onAddPostClick = (value: string) => {
      addPost({id: (posts.length + 1), message: value, likes: 0});
    }

    return (
        <Profile onAddPostClick={onAddPostClick} 
        posts={posts}
        profile={user}
        authId={authId}
        status={status}
        updateStatus={updateStatus}
        updateUserInfo={updateUserInfo}
        setError={setError}
        error={error}
        />
    )
}

  const mapState = (state: AppState): MapStateType => ({
    posts: state.profile.posts,
    user: state.profile.user,
    authId: state.auth.id,
    status: state.profile.status,
    error: state.profile.error
  })

 
  
  const mapDispatchToProps = (dispatch: ThunkDispatch<unknown, StateType, AnyAction>): MapDispatchType => {
    return {
        addPost: (obj) => {
            dispatch(addPost(obj))
        },
        setUser: (id) => dispatch(setUser(id)),
        setStatus: (userId) => dispatch(setUserStatus(userId)),
        updateStatus: (status) => dispatch(updateStatus(status)),
        updateUserInfo: (info) => dispatch(updateUserInfo(info)),
        setError: (message) => dispatch(setErrorAC(message))
    }
  };
  
export default compose<ComponentType>(
    withAuthRedirect,
    connect(mapState, mapDispatchToProps),
  ) (ProfileContainer)
