import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AppState } from "../../redux/reducers";
import { getUsersAC, UsersType } from "../../redux/reducers/usersReducer";
import Users from "./Users";

type MapStateType = {
  users: UsersType[]
};

type MapDispatchType = {
  getUSers: (users: UsersType[]) => void;
};

const UsersContainer = (props: any) => {
  return <Users getUsers={props.getUSers} users={props.users}/>;
};

const mapStateToProps = (state: AppState): MapStateType => ({
  users: state.usersPage.users,
});

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchType => {
  return {
    getUSers: (users: any) => dispatch(getUsersAC(users)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
