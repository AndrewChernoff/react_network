import s from "./Users.module.scss";
import axios from "axios";
import { UsersType } from "../../redux/reducers/usersReducer";
import React from "react";
import Users from "./Users";
import { Loader } from "../../common/Loader";
import API from "../../services/API";

type UsersPropsType = {
  users: UsersType[];
  getUsers: (obj: UsersType[]) => void;
  setTotalCount: (totalCount: number) => void;
  setCurrentPage: (currentPage: number) => void;
  currentPage: number;
  totalCount: number;
  pageSize: number;
  followUser: (id: number) => void;
  unfollowUser: (id: number) => void;
  setFetching: (isFetching: boolean) => void;
  isFetching: boolean;
};

class UsersAPI extends React.Component<UsersPropsType> {

  componentDidMount(): void {
    API.getUsers(this.props.pageSize, this.props.currentPage).then((data) => {
      this.props.getUsers(data.items);
      this.props.setTotalCount(data.totalCount);
      this.props.setFetching(false);
    });
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
                this.props.setCurrentPage(p);
                API.getUsers(this.props.pageSize, this.props.currentPage).then(
                  (data) => {
                    this.props.getUsers(data.items);
                    this.props.setTotalCount(data.totalCount);
                  }
                );
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
            unfollowUser={this.props.unfollowUser}
          />
        )}
      </div>
    );
  }
}

export default UsersAPI;