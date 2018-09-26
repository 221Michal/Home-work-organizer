import { combineReducers } from "redux";
import UserReducer from "./UserReducer";

const rootReducer = combineReducers({
    User: UserReducer,
});
export default rootReducer;