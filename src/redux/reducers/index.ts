import { combineReducers } from "redux";
import disalogsReducer from "./messagesReducer";
import profileReducer from "./profileReducer";

export const rootReducer = combineReducers({
    profile: profileReducer,
    dialogsPage: disalogsReducer
})

export type AppState = ReturnType<typeof rootReducer>
