import s from "./PostItem.module.scss";

interface Message {
  message: string;
  likes: number
}

const PostItem = ({ message, likes }: Message) => {
  return (
    <div className={s.post__item}>
      <img
        src="https://avatarfiles.alphacoders.com/161/thumb-161948.jpg"
        alt="ava"
      />
      <div className={s.post__item_info}>
        <div className={s.post__item_message}>{message}</div>
        <div className={s.post__item_likes}>{likes}</div>
      </div>
    </div>
  );
};

export default PostItem;
