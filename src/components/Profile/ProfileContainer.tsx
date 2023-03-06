import { ChangeEvent, useState } from "react";
import { connect, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Dispatch } from "redux";
import { withAuthRedirect } from "../../HOC/WithAuthRedirect";
import { AppState } from "../../redux/reducers";
import { addPost, PostsType, setUserAC, UserType } from "../../redux/reducers/profileReducer";
import Profile from "./Profile";

export type ProfileProps = {
    posts: PostsType[],
    addPost: (obj: {id: number, message: string, likes: number}) => void
  }

const ProfileContainer = (props: ProfileProps) => {
    const [postText, setPostText] = useState('');
    
    //const isAuth = useSelector<AppState>(state => state.auth.isAuth)


    const onAddPostClick = () => {
      props.addPost({id: (props.posts.length + 1), message: postText, likes: 0});
      setPostText('');
    }

  const onTextareaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPostText(e.currentTarget.value)}

    //if(!isAuth) return <Navigate to='/login'/>

    return (
        <Profile postText={postText} onAddPostClick={onAddPostClick} 
        onTextareaChange={onTextareaChange} 
        posts={props.posts}
        />
    )
}

export type MapStateType = {
    posts: PostsType[]
    user: UserType
  }
  
  const mapState = (state: AppState): MapStateType => ({
    posts: state.profile.posts,
    user: state.profile.user
  })

 export type MapDispatchType = {
    addPost: (obj: PostsType) => void
  }
  
  const mapDispatchToProps = (dispatch: Dispatch): MapDispatchType => {
    return {
        addPost: (obj): void => {
            dispatch(addPost(obj))
        },
    }
  };
  
  export default connect(mapState, mapDispatchToProps) (withAuthRedirect(ProfileContainer))