import { PostsType, UserType } from "../../redux/reducers/profileReducer";
import PostItem from "../PostItem/PostItem";
import s from "./Profile.module.scss";
import ProfileInfo from "./ProfileInfo";

 type ProfileProps = {
  posts: PostsType[],
  postText: string
  onTextareaChange: (value: any) => void
  onAddPostClick: () => void
}

const Profile = (props: ProfileProps) => {

  return (
    <div className={s.profile}>
      <div className={s.profile__container}>
        <ProfileInfo />

        <div className={s.profile__post}>
          <textarea value={props.postText} onChange={props.onTextareaChange}
            />
          <button onClick={props.onAddPostClick}  disabled={props.postText.trim().length === 0? true : false} >Add post</button>
        </div>
        {
            props.posts.map((el) => {
                return <PostItem key={el.id} message={el.message} likes={el.likes} />
            })
        }
      </div>
    </div>
  );
};

export default Profile;