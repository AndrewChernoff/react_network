import { Dispatch } from "redux"
import API from "../../services/API"

const ADD_POST = "ADD_POST"
const SET_USER = "SET_USER"
const SET_STATUS = "SET_STATUS"

type AddPostType = ReturnType<typeof addPost>
type SetUserType = ReturnType<typeof setUserAC>
type SetUserStatusType = ReturnType<typeof setUserStatusAC>

type ActionType = AddPostType | SetUserType | SetUserStatusType


export type PostsType = {
  id: number
  message: string
  likes: number
}

export type UserType = {
  aboutMe: string | null
  contacts: {
    [key: string]: string | null
  }
  fullName: string | null
  lookingForAJobDescription: boolean
  photos: {
    small: string | null
    large: string | null
  }
  userId: number
}

export type ProfileState = {
    posts: PostsType[],
    user: any 
    status: string
}

const initialState: ProfileState = {
  posts: [
  { id: 1, message: "hey", likes: 5 },
  { id: 2, message: "yo", likes: 3 },
  { id: 3, message: "sup", likes: 15 },
  ],
  user: null,
  status: ''
};

const profileReducer = (state = initialState, action: ActionType): ProfileState  => {
  switch (action.type) {
    case ADD_POST:
      return { ...state, posts: [action.payload, ...state.posts] };
    case SET_USER:
      return { ...state, user: action.user };
    case SET_STATUS:
      return { ...state, status: action.status };
    default:
      return state;
  }
};

export const addPost = (payload: PostsType) => ({type: ADD_POST, payload}) as const
export const setUserAC = (user: PostsType) => ({type: SET_USER, user}) as const
export const setUserStatusAC = (status: string) => ({type: SET_STATUS, status}) as const

export const setUser = (userId: number) => (dispatch: Dispatch) => {
  API.getProfile(userId)
        .then(data => dispatch(setUserAC(data))
        )
}

export const setUserStatus = (userId: number) => (dispatch: Dispatch) => {///getting data from server
  API.getStatus(userId)
        .then(data => {
          dispatch(setUserStatusAC(data))
        }
        )
}

export const updateStatus = (status: string) => (dispatch: Dispatch) => {
  API.updateStatus(status)
    .then(data => {
      dispatch(setUserStatusAC(status))
    })
  }

export default profileReducer;
