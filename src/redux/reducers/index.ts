import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AnyAction, combineReducers } from "redux";
import { ThunkDispatch } from "redux-thunk";
import appReducer from "./appReducer";
import authReducer from "./authReducer";
import disalogsReducer from "./messagesReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";

export const rootReducer = combineReducers({
    profile: profileReducer,
    dialogsPage: disalogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    initialize: appReducer
})

export type AppState = ReturnType<typeof rootReducer>

export const useStoreSelector: TypedUseSelectorHook<AppState> = useSelector;
export type AppDispatch = ThunkDispatch<AppState, unknown, AnyAction>
export const useStoreDispatch = () => useDispatch<ThunkDispatch<AppState, unknown, AnyAction>>();