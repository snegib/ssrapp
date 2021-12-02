// combine all reducers
import { combineReducers } from "redux";
import usersReducer from "./usersReducer";

export default combineReducers({
    users: usersReducer,
});
