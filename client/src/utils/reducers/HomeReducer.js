import { 
    HOME_INFO_START,
    HOME_INFO_SUCCES,
    HOME_INFO_ERROR
 } from "../constants/ActionsConst";

 const initialState = {
    homeInfoPending: false,
    homeInfo: {},
};

const HomeReducer = ( state = initialState, action) => {
    switch (action.type) {
        case HOME_INFO_START: {
            return { ...state, homeInfoPending: true }
        }
        case HOME_INFO_SUCCES: {
            return { ...state, homeInfoPending: false, homeInfo: action.payload }
        }
        default: {
            return state;
        }
    }
}

export default HomeReducer