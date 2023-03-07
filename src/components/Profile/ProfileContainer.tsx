import { ChangeEvent, ComponentType, useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { AnyAction, compose, Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { withAuthRedirect } from "../../HOC/WithAuthRedirect";
import { AppState } from "../../redux/reducers";
import { addPost, PostsType, setUser, setUserAC, setUserStatus, updateStatus, UserType } from "../../redux/reducers/profileReducer";
import API from "../../services/API";
import Profile from "./Profile";

/* export type ProfileProps = {
    posts: PostsType[],
    addPost: (obj: {id: number, message: string, likes: number}) => void
    authId: number
  } */

 type PropsType = MapStateType & MapDispatchType

const ProfileContainer = (props: PropsType) => {
    const [postText, setPostText] = useState('');
    

    useEffect(() => {
      if(props.authId) {
        props.setUser(props.authId)
        props.setStatus(props.authId)
      }
    }, [])

    const onAddPostClick = () => {
      props.addPost({id: (props.posts.length + 1), message: postText, likes: 0});
      setPostText('');
    }

  const onTextareaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPostText(e.currentTarget.value)}

    return (
        <Profile postText={postText} onAddPostClick={onAddPostClick} 
        onTextareaChange={onTextareaChange} 
        posts={props.posts}
        profile={props.user}
        authId={props.authId}
        status={props.status}
        updateStatus={props.updateStatus}
        />
    )
}

export type MapStateType = {
    posts: PostsType[]
    user: UserType
    authId: number | null
    status: string
  }
  
  const mapState = (state: AppState): MapStateType => ({
    posts: state.profile.posts,
    user: state.profile.user,
    authId: state.auth.id,
    status: state.profile.status
  })

 export type MapDispatchType = {
    addPost: (obj: PostsType) => void
    setUser: (id: number) => void
    setStatus: (userId: number) => void
    updateStatus: (status: string) => void
  }
  
  const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, AnyAction>): MapDispatchType => {
    return {
        addPost: (obj): void => {
            dispatch(addPost(obj))
        },
        setUser: (id: number): void => dispatch(setUser(id)),
        setStatus: (userId: number): void => dispatch(setUserStatus(userId)),
        updateStatus: (status: string): void => dispatch(updateStatus(status))
    }
  };
  
export default compose<ComponentType>(
    withAuthRedirect,
    connect(mapState, mapDispatchToProps),
  ) (ProfileContainer)