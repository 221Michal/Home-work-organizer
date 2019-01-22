import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import HomeReducer from "./HomeReducer";
import TaskReducer from "./TaskReducer";

const rootReducer = combineReducers({
    User: UserReducer,
    Home: HomeReducer,
    Task: TaskReducer,
});
export default rootReducer;