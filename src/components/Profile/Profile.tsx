import { Dispatch, useState } from "react";
import { connect, ConnectedProps  } from "react-redux";
import { addPost, PostsType } from "../../redux/reducers/profileReducer";
import PostItem from "../PostItem/PostItem";
import s from "./Profile.module.scss";

type ProfileProps = {
  posts: PostsType[],
  addPost: (obj: {id: number, message: string, likes: number}) => void
}

const Profile = (props: ProfileProps) => {
  const [postText, setPostText] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const onAddPostClick = () => {
    props.addPost({id: (props.posts.length + 1), message: postText, likes: 0});
    setPostText('');
  }

  return (
    <div className={s.profile}>
      <div className={s.profile__container}>
        <h2>Ava + descr</h2>

        <div className={s.profile__post}>
          <textarea value={postText} onChange={(e) => {
            setIsDisabled(false);
            setPostText(e.currentTarget.value)}
            }
            />
          <button onClick={onAddPostClick} disabled={postText === ''? true : false}>Add post</button>
        </div>
        {
            props.posts.map(el => {
                return <PostItem key={el.id} message={el.message} likes={el.likes} />
            })
        }
      </div>
    </div>
  );
};

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

export default connector(Profile);
