import { NavLink } from "react-router-dom";
import userAva from "../../imgs/user.png";
import s from "./Users.module.scss";

type UserPropsType = {
    id: number
    status: string | null
    name: string
    photos: {
        small: string | null;
        large: string | null;
    }
    onFollowClick: (id: number) => void
    onUnFollowClick: (id: number) => void
    followingInProgress: number[]
    followed: boolean
}

const User = ({id, photos, followed, name, status, followingInProgress, onFollowClick, onUnFollowClick}:UserPropsType) => {
    return <div key={id}>
    <NavLink className={s.user} to={`/profile/${id}`}>
      <img
        className={s.user__img}
        src={photos.small ? photos.small : userAva}
        alt="user ava"
      />
    </NavLink>
    <div>
      {followed ? (
        <button disabled={followingInProgress.some(el => el === id ? true : false)} onClick={() => onUnFollowClick(id)}>
          Unfollow
        </button>
      ) : (
        <button disabled={followingInProgress.some(el => el === id ? true : false)} onClick={() => onFollowClick(id)}>
          Follow
        </button>
      )}
    </div>
    <div>{name}</div>
    <div>{status}</div>
  </div>
}

export default User;