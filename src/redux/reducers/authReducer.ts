import { Dispatch } from "redux"
import API from "../../services/API"

const SET_USER = "SET_USER"
const LOGOUT = "LOGOUT"

type SetUserType = ReturnType<typeof setUserAuthorizedUserAC>
type LogoutType = ReturnType<typeof logoutAC>

type Action = SetUserType | LogoutType

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
};

const initialState: AuthState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
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
    default:
      return state;
  }
};

export const setUserAuthorizedUserAC = ({id, email, login}: AuthDataType) => ({type: SET_USER, payload: {id, email, login}}) as const
export const logoutAC = () => ({type: LOGOUT}) as const

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

export const logIn = (obj: any) => (dispatch: any) => {
    API.login(obj)
    .then(data => {
        if (data.resultCode === 0) {    
            console.log(data);
            dispatch(setUserAuthorizedUserThunk())
        }
    }
    )
}


export default authReducer;
