import { combineReducers } from "redux";
import authReducer from "./authReducer";
import disalogsReducer from "./messagesReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";

export const rootReducer = combineReducers({
    profile: profileReducer,
    dialogsPage: disalogsReducer,
    usersPage: usersReducer,
    auth: authReducer
})

export type AppState = ReturnType<typeof rootReducer>
