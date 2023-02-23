import { UsersType } from "../../redux/reducers/usersReducer";
import userAva from "../../imgs/user.png";
import s from "./Users.module.scss";
import { NavLink } from "react-router-dom";
import React from "react";

type UsersProps = {
  users: UsersType[]
  followUser: (id: number) => void
  unFollowUser: (id: number) => void
  followingInProgress: number[]
};

class Users extends React.Component<UsersProps> {
  onFollowClick = (userId: number) => {
    this.props.followUser(userId)
  };

  onUnFollowClick = (userId: number) => {
    this.props.unFollowUser(userId)
  };

  render() {
    return (
      <div>
        {this.props.users.map((u) => {
          return (
            <div key={u.id}>
              <NavLink key={u.id} className={s.user} to={`/profile/${u.id}`}>
                <img
                  className={s.user__img}
                  src={u.photos.small ? u.photos.small : userAva}
                  alt="user ava"
                />
              </NavLink>
              <div>
                {u.followed ? (
                  <button disabled={this.props.followingInProgress.some(el => el === u.id ? true : false)} onClick={() => this.onUnFollowClick(u.id)}>
                    Unfollow
                  </button>
                ) : (
                  <button disabled={this.props.followingInProgress.some(el => el === u.id ? true : false)} onClick={() => this.onFollowClick(u.id)}>
                    Follow
                  </button>
                )}
              </div>
              <div>{u.name}</div>
              <div>{u.status}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Users;
