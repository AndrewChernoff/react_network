import { UsersType } from "../../redux/reducers/usersReducer";
import userAva from "../../imgs/user.png";
import s from "./Users.module.scss";
import { NavLink } from "react-router-dom";
import axios from "axios";
import React from "react";
import API from "../../services/API";

type UsersProps = {
  users: UsersType[]
  followUser: (id: number) => void
  unfollowUser: (id: number) => void
  setFollowingInProgress: (fetching: boolean, userId: number) => void
  followingInProgress: number[]
};

class Users extends React.Component<UsersProps> {
  onFollowClick = (userId: number) => {
    this.props.setFollowingInProgress(true, userId)
      API.follow(userId).then((res) => {
        if (res.data.resultCode === 0) {
          this.props.followUser(userId);
        }
        this.props.setFollowingInProgress(false, userId)
      });
  };

  onUnFollowClick = (userId: number) => {
    this.props.setFollowingInProgress(true, userId)
      API.unfollow(userId).then((res) => {
        if (res.data.resultCode === 0) {
        this.props.unfollowUser(userId)
        }
        this.props.setFollowingInProgress(false, userId)
      });
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
