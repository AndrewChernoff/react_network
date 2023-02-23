import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AppState } from "../../redux/reducers";
import {
  followUser,
  followUserAC,
  getUsers,
  getUsersAC,
  getUsersOnPageClick,
  setCurrentPageAC,
  setFetchingAC,
  setFollowingInProgressAC,
  setTotalCountAC,
  unFollowUser,
  unfollowUserAC,
  UsersType,
} from "../../redux/reducers/usersReducer";
import UsersAPI from "./UsersAPI";

type MapStateType = {
  users: UsersType[]
  currentPage: number
  totalCount: number
  pageSize: number
  isFetching: boolean
  followingInProgress: number[]
};

type MapDispatchType = {
  getUsers: (users: UsersType[]) => void;
  setTotalCount: (totalCount: number) => void;
  setCurrentPage: (currentPage: number) => void;
  followUser: (id: number) => void;
  unfollowUser: (id: number) => void;
  setFetching: (isFetching: boolean) => void;
};

const UsersContainer = (props: any) => {
  return (
    <UsersAPI
      getUsers={props.getUsers}
      users={props.users}
      currentPage={props.currentPage}
      pageSize={props.pageSize}
      totalCount={props.totalCount}
      followUser={props.followUser}
      unFollowUser={props.unFollowUser}
      isFetching={props.isFetching}
      followingInProgress={props.followingInProgress}
      getUsersOnPageClick={props.getUsersOnPageClick}
    />
  );
};

const mapStateToProps = (state: AppState): MapStateType => ({
  users: state.usersPage.users,
  currentPage: state.usersPage.currentPage,
  totalCount: state.usersPage.totalCount,
  pageSize: state.usersPage.pageSize,
  isFetching: state.usersPage.isFetching,
  followingInProgress: state.usersPage.followingInProgress
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
export default connect(mapStateToProps, {
  getUsers: getUsers,
  getUsersOnPageClick: getUsersOnPageClick,
  followUser: followUser,
  unFollowUser: unFollowUser,
})(UsersContainer);
