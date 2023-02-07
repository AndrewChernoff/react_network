import { combineReducers } from "redux";
import disalogsReducer from "./messagesReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";

export const rootReducer = combineReducers({
    profile: profileReducer,
    dialogsPage: disalogsReducer,
    usersPage: usersReducer
})

export type AppState = ReturnType<typeof rootReducer>
