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

const ProfileContainer = (props: PropsType) => {

  console.log('Profile Container');
  const {id} = useParams();
  
    useEffect(() => {
      if(id) {
          props.setUser(+id)
          props.setStatus(+id)
      } else {
        if(props.authId) {
          props.setUser(props.authId)
          props.setStatus(props.authId)
        }
      }
    }, [id])

    const onAddPostClick = (value: string) => {
      props.addPost({id: (props.posts.length + 1), message: value, likes: 0});
    }

    return (
        <Profile onAddPostClick={onAddPostClick} 
        posts={props.posts}
        profile={props.user}
        authId={props.authId}
        status={props.status}
        updateStatus={props.updateStatus}
        updateUserInfo={props.updateUserInfo}
        setError={props.setError}
        error={props.error}
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

 
  
  const mapDispatchToProps = (dispatch: /* ThunkAction<void, StateType, unknown, AnyAction> */ ThunkDispatch<unknown, StateType, AnyAction>): MapDispatchType => {
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
