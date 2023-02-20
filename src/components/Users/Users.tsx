import { UsersType } from "../../redux/reducers/usersReducer";
import userAva from "../../imgs/user.png";
import s from "./Users.module.scss";
import { NavLink } from "react-router-dom";
import axios from "axios";
import React from "react";
import API from "../../services/API";

type UsersProps = {
  users: UsersType[];
  followUser: (id: number) => void;
  unfollowUser: (id: number) => void;
};

class Users extends React.Component<UsersProps> {
  onFollowClick = (userId: number) => {
    /* axios
      .post(
        `https://social-network.samuraijs.com/api/1.0/follow/${userId}`,
        {},
        {
          withCredentials: true,
          headers: {
            "API-KEY": "cf030fe2-6f9a-49e8-86a7-893fb44b9868",
          },
        }
      ) */
      API.follow(userId).then((res) => {
        if (res.data.resultCode === 0) {
          this.props.followUser(userId);
        }
      });
  };

  onUnFollowClick = (userId: number) => {
    /* axios
      .delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {
        withCredentials: true,
        headers: {
          "API-KEY": "cf030fe2-6f9a-49e8-86a7-893fb44b9868",
        },
      }) */
      API.unfollow(userId).then((res) => {
        if (res.data.resultCode === 0) {
        this.props.unfollowUser(userId)
        }
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
                  <button onClick={() => this.onUnFollowClick(u.id)}>
                    Unfollow
                  </button>
                ) : (
                  <button onClick={() => this.onFollowClick(u.id)}>
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
