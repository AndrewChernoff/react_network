import user from "../../imgs/user.png";
import s from "./Users.module.scss";
import axios from "axios";
import { UsersType } from "../../redux/reducers/usersReducer";
import React from "react";

type UsersPropsType = {
  users: UsersType[]
  getUsers: (obj: UsersType[]) => void
  setTotalCount: (totalCount: number) => void
  setCurrentPage: (currentPage: number) => void
  currentPage: number
  totalCount: number
  pageSize: number
};


class UsersAPI extends React.Component<UsersPropsType> {

  getData = async () => {
    const { data } = await axios.get(
      `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`
    );
    return await data;
  };

  componentDidMount(): void {
      this.getData()
      .then((data) => {
        this.props.getUsers(data.items)
        this.props.setTotalCount(data.totalCount)
      })
    }
  
  render() {

    let pages: number[] = []

    for (let i = 1; i <= Math.ceil(this.props.totalCount / this.props.pageSize); i++) {
      pages.push(i)
    }

    return (
      <div className={s.users}>
      <div>
        {pages.map(p => <span key={p} className={p === this.props.currentPage ? s.active__page : ''} onClick={() => { 
          this.props.setCurrentPage(p)
          this.getData()
      .then((data) => {
        this.props.getUsers(data.items)
        this.props.setTotalCount(data.totalCount)
      })
        }
        }> {p} </span>)}
      </div>
      {/* {this.props.users.map((u) => {
        return (
          <div key={u.id} className={s.user}>
            <img className={s.user__img} src={user} alt="user ava" />
            <div>
              {u.followed ? <button>Unfollow</button> : <button>Follow</button>}
            </div>
            <div>{u.name}</div>
          </div>
        );
      })} */}
    </div>
    );
  }
}

export default UsersAPI;
