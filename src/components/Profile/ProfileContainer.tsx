import { ChangeEvent, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AppState } from "../../redux/reducers";
import { addPost, PostsType } from "../../redux/reducers/profileReducer";
import Profile from "./Profile";

type ProfileProps = {
    posts: PostsType[],
    addPost: (obj: {id: number, message: string, likes: number}) => void
  }

const ProfileContainer = (props: ProfileProps) => {
    const [postText, setPostText] = useState('');

  const onAddPostClick = () => {
    props.addPost({id: (props.posts.length + 1), message: postText, likes: 0});
    setPostText('');
  }

  const onTextareaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPostText(e.currentTarget.value)}

    return (
        <Profile postText={postText} onAddPostClick={onAddPostClick} onTextareaChange={onTextareaChange} posts={props.posts}/>
    )
}

 type MapStateType = {
    posts: PostsType[]
  }
  
  const mapState = (state: AppState): MapStateType => ({
    posts: state.profile.posts
  })

 type MapDispatchType = {
    addPost: (obj: PostsType) => void
  }
  
  const mapDispatchToProps = (dispatch: Dispatch): MapDispatchType => {
    return {
        addPost: (obj): void => {
            dispatch(addPost(obj));
        }
    }
  };
  
  const connector = connect(mapState, mapDispatchToProps)
  

  export default connector(ProfileContainer)