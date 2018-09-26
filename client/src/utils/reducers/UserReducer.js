import {
    USER_LOGIN_START
 } from '../constants/ActionsConst';

 const initialState = {
    loginPending: false,
};

const UserReducer = ( state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_START: {
            const { type, ...actionWithoutType } = action;
            return { ...state, ...actionWithoutType, loginPending: true };
        }
        default: {
            return state;
        }
    }
};

export default UserReducer