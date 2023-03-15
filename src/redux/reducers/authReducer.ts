import { AppState } from './index';
import { AnyAction, Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import API from "../../services/API"

const SET_USER = "SET_USER"
const LOGOUT = "LOGOUT"
const LOGIN_ERROR = "LOGIN_ERROR"

type SetUserType = ReturnType<typeof setUserAuthorizedUserAC>
type LogoutType = ReturnType<typeof logoutAC>
type LogInErrorType = ReturnType<typeof logInErrorAC>

type Action = SetUserType | LogoutType | LogInErrorType

export type AuthDataType = {
    id: number,
    email: string,
    login: string
}

export type AuthState = {
    id: null | number
    email: null | string
    login: null | string
    isAuth: boolean
    loginError: boolean
};

const initialState: AuthState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    loginError: false
};

const authReducer = (state = initialState, action: Action): AuthState => {
    switch (action.type) {
    case SET_USER:
        return {
            ...state,
            ...action.payload,
            isAuth: true
        }
    case LOGOUT:
        return  {
        ...state,
        id: null,
        email: null,
        login: null,
        isAuth: false
    }
    case LOGIN_ERROR:
        return  {
        ...state,
        loginError: action.payload
    }
    default:
      return state;
  }
};

export const setUserAuthorizedUserAC = ({id, email, login}: AuthDataType) => ({type: SET_USER, payload: {id, email, login}}) as const
export const logoutAC = () => ({type: LOGOUT}) as const
export const logInErrorAC = (payload: boolean) => ({type: LOGIN_ERROR, payload}) as const

export const setUserAuthorizedUserThunk = () => (dispatch: Dispatch) => {
    API.authMe()
    .then(data => {
        if (data.resultCode === 0) {    
            dispatch(setUserAuthorizedUserAC(data.data))}
        }
    )
}

export const logOut = () => (dispatch: Dispatch) => {
    API.logout()
    .then(data => {
        if (data.resultCode === 0) {    
            dispatch(logoutAC())}
        }
    )
}

export const logIn = (obj: any): ThunkAction<void, AppState, unknown, AnyAction> => (dispatch) => {
    API.login(obj)
    .then(data => {
        if (data.resultCode === 0) {    
            dispatch(logInErrorAC(false))
            dispatch(setUserAuthorizedUserThunk())
        } else if (data.resultCode === 1) {
            dispatch(logInErrorAC(true))
        }
    }
    )
}


export default authReducer;
