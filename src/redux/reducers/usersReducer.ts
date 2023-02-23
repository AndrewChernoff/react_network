import { Dispatch } from "redux";
import API from "../../services/API";

const GET_USERS = "GET_USERS";
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const FETCHING = "FETCHING";
const FOLLOWING_IN_PROGRESS = "FOLLOWING";

type GetUsersType = ReturnType<typeof getUsersAC>;
type SetTotalCountType = ReturnType<typeof setTotalCountAC>;
type SetCurrentPageType = ReturnType<typeof setCurrentPageAC>;
type FollowUserACType = ReturnType<typeof followUserAC>;
type UnfollowUserACType = ReturnType<typeof unfollowUserAC>;
type SetFetchingACType = ReturnType<typeof setFetchingAC>;
type SetFollowingInProgressACType = ReturnType<typeof setFollowingInProgressAC>;

type ActionType =
  | GetUsersType
  | SetTotalCountType
  | SetCurrentPageType
  | FollowUserACType
  | UnfollowUserACType
  | SetFetchingACType
  | SetFollowingInProgressACType;

export type UsersType = {
  name: string;
  id: number;
  uniqueUrlName: string | null;
  photos: {
    small: string | null;
    large: string | null;
  };
  status: string | null;
  followed: boolean;
};

type StateType = {
  users: UsersType[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  isFetching: boolean;
  followingInProgress: number[];
};

const initialState: StateType = {
  users: [],
  totalCount: 0,
  currentPage: 1,
  pageSize: 5,
  isFetching: false,
  followingInProgress: [],
};

export const usersReducer = (
  state = initialState,
  action: ActionType
): StateType => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, users: action.payload };
    case SET_TOTAL_COUNT:
      return { ...state, totalCount: action.payload };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.id ? { ...u, followed: true } : u
        ),
      };
    case UNFOLLOW:
      debugger
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.id ? { ...u, followed: false } : u
        ),
      };
    case FETCHING:
      return { ...state, isFetching: action.payload };
    case FOLLOWING_IN_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.fetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((el) => el !== action.userId),
      };
    }
    default:
      return state;
  }
};

export const getUsersAC = (payload: UsersType[]) =>
  ({ type: GET_USERS, payload } as const);
export const setTotalCountAC = (payload: number) =>
  ({ type: SET_TOTAL_COUNT, payload } as const);
export const setCurrentPageAC = (payload: number) =>
  ({ type: SET_CURRENT_PAGE, payload } as const);
export const followUserAC = (id: number) => ({ type: FOLLOW, id } as const);
export const unfollowUserAC = (id: number) => ({ type: UNFOLLOW, id } as const);
export const setFetchingAC = (payload: boolean) =>
  ({ type: FETCHING, payload } as const);
export const setFollowingInProgressAC = (fetching: boolean, userId: number) =>
  ({ type: FOLLOWING_IN_PROGRESS, fetching, userId } as const);

export const getUsers = (pageSize: number, currentPage: number) => (dispatch: Dispatch) => {
      dispatch(setFetchingAC(true));
    API.getUsers(pageSize, currentPage).then((data) => {
      dispatch(getUsersAC(data.items));
      dispatch(setTotalCountAC(data.totalCount));
      dispatch(setFetchingAC(false));
    });
  };

export const getUsersOnPageClick = (pageSize: number, currentPage: number) => (dispatch: Dispatch) => {
    API.getUsers(pageSize, currentPage).then((data) => {
      dispatch(setCurrentPageAC(currentPage));
      dispatch(getUsersAC(data.items));
      dispatch(setTotalCountAC(data.totalCount));
    });
  };

export const followUser = (userId: number) => (dispatch: Dispatch) => {
    dispatch(setFollowingInProgressAC(true, userId))
      API.follow(userId).then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(followUserAC(userId));
        }
        dispatch(setFollowingInProgressAC(false, userId))
      });
}

export const unFollowUser = (userId: number) => (dispatch: Dispatch) => {
    dispatch(setFollowingInProgressAC(true, userId))
      API.unfollow(userId).then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(unfollowUserAC(userId));
        }
        dispatch(setFollowingInProgressAC(false, userId))
      });
}
  
export default usersReducer;
