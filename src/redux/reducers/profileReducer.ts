import { Dispatch } from "redux"
import API from "../../services/API"
import { UserContactValues } from "../../components/Profile/ProfileFormInfo/ProfileFormInfo"
import { UsersType } from "./usersReducer"

const ADD_POST = "profile/ADD_POST"
const SET_USER = "profile/SET_USER"
const SET_STATUS = "profile/SET_STATUS"
const UPDATE_INFO = "profile/UPDATE_INFO"
const SET_ERROR = "profile/SET_ERROR"
const CHANGE_PHOTO = "profile/CHANGE_PHOTO"

type AddPostType = ReturnType<typeof addPost>
type SetUserType = ReturnType<typeof setUserAC>
type SetUserStatusType = ReturnType<typeof setUserStatusAC>
type UpdateInfoType = ReturnType<typeof updateInfoAC>
type SetErroroType = ReturnType<typeof setErrorAC>
type SetChangePhotoType = ReturnType<typeof changePhotoAC>

type ActionType = AddPostType | SetUserType | SetUserStatusType | UpdateInfoType | SetErroroType | SetChangePhotoType

export type PostsType = {
  id: number
  message: string
  likes: number
}

export type UserType = {
  aboutMe: string
  contacts: {
    [key: string]: string
  }
  fullName: string
  lookingForAJob: boolean
  lookingForAJobDescription: boolean
  photos: {
    small: string
    large: string
  }
  userId: number
}


/* type UserType = {
  name: string;
  id: number;
  uniqueUrlName: string;
  photos: {
      small: string | null;
      large: string | null;
  };
  status: string | null;
  followed: boolean;
} */


export type ProfileState = {
    posts: /* PostsType[] */any[]
    user: UserType | any
    status: string
    error: string | null
}

const initialState: ProfileState = {
  posts: [
  { id: 1, message: "hey", likes: 5 },
  { id: 2, message: "yo", likes: 3 },
  { id: 3, message: "sup", likes: 15 },
  ],
  user: null,
  status: '',
  error: null
};

const profileReducer = (state = initialState, action: ActionType): ProfileState  => {
  switch (action.type) {
    case ADD_POST:
      return { ...state, posts: [action.payload, ...state.posts] };
    case SET_USER:
      return { ...state, user: action.user };
    case SET_STATUS:
      return { ...state, status: action.status };
      case UPDATE_INFO:
        return {...state, user: {...state.user, ...action.info}}
      case SET_ERROR:
        return {...state, error: action.error}
      case CHANGE_PHOTO:
        return {...state, user: {...state.user, photos: action.photos}}
    default:
      return state;
  }
};

export const addPost = (payload: PostsType) => ({type: ADD_POST, payload}) as const
const setUserAC = (user: PostsType) => ({type: SET_USER, user}) as const
const setUserStatusAC = (status: string) => ({type: SET_STATUS, status}) as const
const updateInfoAC = (info: UserContactValues) => ({type: UPDATE_INFO, info}) as const
export const setErrorAC = (error: string | null) => ({type: SET_ERROR, error}) as const
const changePhotoAC = (photos: {large: string, small: string}) => ({type: CHANGE_PHOTO, photos}) as const

export const setUser = (userId: number) => (dispatch: Dispatch) => {
  API.getProfile(userId)
        .then(data => dispatch(setUserAC(data))
        )
}

export const setUserStatus = (userId: number) => async(dispatch: Dispatch) => {///getting data from server
  const res = await API.getStatus(userId)  
          dispatch(setUserStatusAC(res))
}

export const updateStatus = (status: string) => async(dispatch: Dispatch) => {
  const res = await API.updateStatus(status)
  if(res.resultCode === 0) {
      dispatch(setUserStatusAC(status))
    }
  }

export const updateUserInfo = (info: UserContactValues) => async(dispatch: Dispatch) => {
  const res = await API.updateInfo(info)
      if(res.resultCode === 0) {
        dispatch(updateInfoAC(info))
      } else if (res.resultCode === 1 && res.messages.length > 0) {
        dispatch(setErrorAC(res.messages[0]))
      }
}
//
export const updatePhoto = (photo: File) => async(dispatch: Dispatch) => {
  
  const res = await API.updatePhoto(photo)
  
      if(res.resultCode === 0) {
        dispatch(changePhotoAC(res.data.photos))
      } else if (res.resultCode === 1 && res.messages.length > 0) {
        dispatch(setErrorAC(res.messages[0]))
      }
}

export default profileReducer;
