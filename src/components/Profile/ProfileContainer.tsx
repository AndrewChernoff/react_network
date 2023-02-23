import { ChangeEvent, useState } from "react";
import { connect, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Dispatch } from "redux";
import { AppState } from "../../redux/reducers";
import { addPost, PostsType, setUserAC, UserType } from "../../redux/reducers/profileReducer";
import Profile from "./Profile";

type ProfileProps = {
    posts: PostsType[],
    addPost: (obj: {id: number, message: string, likes: number}) => void
  }

const ProfileContainer = (props: ProfileProps) => {
    const [postText, setPostText] = useState('');
    
    const isAuth = useSelector<AppState>(state => state.auth.isAuth)


  const onAddPostClick = () => {
    props.addPost({id: (props.posts.length + 1), message: postText, likes: 0});
    setPostText('');
  }

  const onTextareaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPostText(e.currentTarget.value)}

    if(!isAuth) return <Navigate to='/login'/>

    return (
        <Profile postText={postText} onAddPostClick={onAddPostClick} 
        onTextareaChange={onTextareaChange} 
        posts={props.posts}
        />
    )
}

 type MapStateType = {
    posts: PostsType[]
    user: UserType///
  }
  
  const mapState = (state: AppState): MapStateType => ({
    posts: state.profile.posts,
    user: state.profile.user
  })

 type MapDispatchType = {
    addPost: (obj: PostsType) => void
  }
  
  const mapDispatchToProps = (dispatch: Dispatch): MapDispatchType => {
    return {
        addPost: (obj): void => {
            dispatch(addPost(obj))
        },
    }
  };
  
  const connector = connect(mapState, mapDispatchToProps)
  

  export default connector(ProfileContainer)