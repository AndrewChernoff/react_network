import { UsersType } from "../../redux/reducers/usersReducer";
import userAva from "../../imgs/user.png";
import s from "./Users.module.scss";
import { NavLink } from "react-router-dom";

type UsersProps = {
    users: UsersType[]
    followUser: (id: number) => void
    unfollowUser: (id: number) => void
}

const Users = ({users, followUser, unfollowUser}: UsersProps) => {
   return <div>
       {users.map((u) => {
        return (
        <div key={u.id}>
          <NavLink key={u.id} className={s.user} to={`/profile/${u.id}`}>
            <img className={s.user__img} src={u.photos.small ? u.photos.small : userAva} alt="user ava" />
            </NavLink>
            <div>
              {u.followed ? <button onClick={() => unfollowUser(u.id)}>Unfollow</button> : <button onClick={() => followUser(u.id)}>Follow</button>}
            </div>
            <div>{u.name}</div>
            <div>{u.status}</div>
        </div>
        );
      })}
    </div>
}

export default Users