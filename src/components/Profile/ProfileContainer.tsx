import { ChangeEvent, Dispatch, useState } from "react";
import { connect, ConnectedProps  } from "react-redux";
import { addPost, PostsType } from "../../redux/reducers/profileReducer";
import PostItem from "../PostItem/PostItem";
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

type PostsFromState = {
    posts: PostsType[]
  }
  
  type RootState = {
    profile: PostsFromState
  }
  
  const mapState = (state: RootState) => ({
    posts: state.profile.posts
  })
  
  const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        addPost: (obj: PostsType): void => {
            dispatch(addPost(obj));
        }
    }
  };
  
  const connector = connect(mapState, mapDispatchToProps)
  

  export default connector(ProfileContainer)