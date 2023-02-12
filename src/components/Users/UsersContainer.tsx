import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AppState } from "../../redux/reducers";
import { getUsersAC, setCurrentPageAC, setTotalCountAC, UsersType } from "../../redux/reducers/usersReducer";
import Users from "./Users";

type MapStateType = {
  users: UsersType[]
  currentPage: number
  totalCount: number
  pageSize: number
};

type MapDispatchType = {
  getUsers: (users: UsersType[]) => void
  setTotalCount: (totalCount: number) => void
  setCurrentPage: (currentPage: number) => void
};


const UsersContainer = (props: any) => {
  return <Users getUsers={props.getUsers} users={props.users} 
  setTotalCount={props.setTotalCount}
  currentPage={props.currentPage}
  pageSize={props.pageSize}
  totalCount={props.totalCount}
  setCurrentPage={props.setCurrentPage}/>
};

const mapStateToProps = (state: AppState): MapStateType => ({
  users: state.usersPage.users,
  currentPage: state.usersPage.currentPage,
  totalCount: state.usersPage.totalCount,
  pageSize: state.usersPage.pageSize,
});

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchType => {
  return {
    getUsers: (users) => dispatch(getUsersAC(users)),
    setTotalCount: (totalCount) => dispatch(setTotalCountAC(totalCount)),
    setCurrentPage: (currentPage) => dispatch(setCurrentPageAC(currentPage))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
