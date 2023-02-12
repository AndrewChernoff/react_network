import { UsersType } from "../../redux/reducers/usersReducer";
import user from "../../imgs/user.png";
import s from "./Users.module.scss";

type UsersProps = {
    users: UsersType[]
    followUser: (id: number) => void
    unfollowUser: (id: number) => void
}

const Users = ({users, followUser, unfollowUser}: UsersProps) => {
   return <div>
       {users.map((u) => {
        return (
          <div key={u.id} className={s.user}>
            <img className={s.user__img} src={user} alt="user ava" />
            <div>
              {u.followed ? <button onClick={() => unfollowUser(u.id)}>Unfollow</button> : <button onClick={() => followUser(u.id)}>Follow</button>}
            </div>
            <div>{u.name}</div>
          </div>
        );
      })}
    </div>
}

export default Users