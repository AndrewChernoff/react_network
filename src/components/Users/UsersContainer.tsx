import { connect, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { withAuthRedirect } from "../../HOC/WithAuthRedirect";
import { AppState } from "../../redux/reducers";
import {
  followUser,
  getUsers,
  getUsersOnPageClick,
  unFollowUser,
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

  /* const isAuth = useSelector<AppState>(state => state.auth.isAuth)

    if(!isAuth) return <Navigate to='/login'/> */


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
})(withAuthRedirect(UsersContainer));
