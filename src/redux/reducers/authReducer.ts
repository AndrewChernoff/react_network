const SET_USER = "SET_USER"

type SetUserType = ReturnType<typeof setUserAuthorizedUserAC>

type Action = SetUserType

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

    default:
      return state;
  }
};

export const setUserAuthorizedUserAC = ({id, email, login}: AuthDataType) => ({type: SET_USER, payload: {id, email, login}}) as const

export default authReducer;
