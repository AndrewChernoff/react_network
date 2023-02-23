import s from "./Users.module.scss";
import axios from "axios";
import { UsersType } from "../../redux/reducers/usersReducer";
import React from "react";
import Users from "./Users";
import { Loader } from "../../common/Loader";

type UsersPropsType = {
  users: UsersType[]
  getUsers: (pageSize: number, currentPage: number) => void
  currentPage: number
  totalCount: number
  pageSize: number
  followUser: (id: number) => void
  unFollowUser: (id: number) => void
  isFetching: boolean
  followingInProgress: number[]
  getUsersOnPageClick: (pageSize: number, currentPage: number) => void
};

class UsersAPI extends React.Component<UsersPropsType> {
  componentDidMount(): void {
    this.props.getUsers(this.props.pageSize, this.props.currentPage)
  }

  render() {
    let pages: number[] = [];

    for (
      let i = 1;
      i <= Math.ceil(this.props.totalCount / this.props.pageSize);
      i++
    ) {
      pages.push(i);
    }

    return (
      <div className={s.users}>
        <div>
          {pages.map((p) => (
            <span
              key={p}
              className={p === this.props.currentPage ? s.active__page : ""}
              onClick={() => {
                this.props.getUsersOnPageClick(this.props.pageSize, p)
              }}
            >
              {p}
            </span>
          ))}
        </div>
        {this.props.isFetching ? (
          <Loader />
        ) : (
          <Users
            users={this.props.users}
            followUser={this.props.followUser}
            unFollowUser={this.props.unFollowUser}
            followingInProgress={this.props.followingInProgress}
          />
        )}
      </div>
    );
  }
}

export default UsersAPI;