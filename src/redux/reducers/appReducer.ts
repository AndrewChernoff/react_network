import { AppState } from './index';
import { AnyAction, Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { setUserAuthorizedUserThunk } from './authReducer';

const SET_APP_INIT = "app/SET_APP_INIT"

type SetAppInitType = ReturnType<typeof setAppInitAC>

type Action = SetAppInitType

export type StateType = {
    init: boolean
};

const initialState: StateType = {
    init: false
};

const appReducer = (state = initialState, action: Action): StateType => {
    switch (action.type) {
    case SET_APP_INIT:
        return {
            ...state,
            init: true
        }

    default:
      return state;
  }
};

export const setAppInitAC = () => ({type: SET_APP_INIT}) as const

export const initializeThunk = (): ThunkAction<void, AppState, unknown, AnyAction> => (dispatch) => {
   let promise = dispatch(setUserAuthorizedUserThunk())
   Promise.all([promise]).then(() => dispatch(setAppInitAC()))
    
}

export default appReducer;