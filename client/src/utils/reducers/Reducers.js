import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import HomeReducer from "./HomeReducer";

const rootReducer = combineReducers({
    User: UserReducer,
    Home: HomeReducer,
});
export default rootReducer;