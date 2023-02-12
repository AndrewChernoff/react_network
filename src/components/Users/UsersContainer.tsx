import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AppState } from "../../redux/reducers";
import { followUserAC, getUsersAC, setCurrentPageAC, setFetchingAC, setTotalCountAC, unfollowUserAC, UsersType } from "../../redux/reducers/usersReducer";
import UsersAPI from "./UsersAPI";

type MapStateType = {
  users: UsersType[]
  currentPage: number
  totalCount: number
  pageSize: number
  isFetching: boolean
};

type MapDispatchType = {
  getUsers: (users: UsersType[]) => void
  setTotalCount: (totalCount: number) => void
  setCurrentPage: (currentPage: number) => void
  followUser: (id: number) => void
  unfollowUser: (id: number) => void
  setFetching: (isFetching: boolean) => void
};


const UsersContainer = (props: any) => {
  return <UsersAPI getUsers={props.getUsers} users={props.users} 
  setTotalCount={props.setTotalCount}
  currentPage={props.currentPage}
  pageSize={props.pageSize}
  totalCount={props.totalCount}
  setCurrentPage={props.setCurrentPage}
  followUser={props.followUser}
  unfollowUser={props.unfollowUser}
  setFetching={props.setFetching}
  isFetching={props.isFetching}
  />
  
};

const mapStateToProps = (state: AppState): MapStateType => ({
  users: state.usersPage.users,
  currentPage: state.usersPage.currentPage,
  totalCount: state.usersPage.totalCount,
  pageSize: state.usersPage.pageSize,
  isFetching: state.usersPage.isFetching
});

/* const mapDispatchToProps = (dispatch: Dispatch): MapDispatchType => {
  return {
    getUsers: (users) => dispatch(getUsersAC(users)),
    setTotalCount: (totalCount) => dispatch(setTotalCountAC(totalCount)),
    setCurrentPage: (currentPage) => dispatch(setCurrentPageAC(currentPage)),
    followUser: (id) => dispatch(followUserAC(id)),
    unfollowUser: (id) => dispatch(unfollowUserAC(id)),
    setFetching: (isFetching) => dispatch(setFetchingAC(isFetching)),
  };
};*/
export default connect(mapStateToProps,  {
  getUsers: getUsersAC,
  setTotalCount: setTotalCountAC,
  setCurrentPage: setCurrentPageAC,
  followUser: followUserAC,
  unfollowUser: unfollowUserAC,
  setFetching: setFetchingAC,
})(UsersContainer);
