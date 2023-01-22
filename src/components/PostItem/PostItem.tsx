import s from "./PostItem.module.scss";

interface Message {
  message: string;
  likes: number
}

const PostItem = ({ message, likes }: Message) => {
  return (
    <div className={s.post__item}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm-BebyP8MCIYBsrjWGGdgXo2gnqI95ckd1w&usqp=CAU"
        alt="ava"
      />
      <div className={s.post__item_info}>
        <div className={s.post__item_message}>{message}</div>
        <div className={s.post__item_likes}>likes: {likes}</div>
      </div>
    </div>
  );
};

export default PostItem;
