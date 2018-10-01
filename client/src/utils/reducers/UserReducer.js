import {
    USER_REGISTER_START,
    AUTH_SUCCESS,
    USER_LOGIN_START,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_ERROR,
    USER_LOG_OUT,
 } from '../constants/ActionsConst';

 const initialState = {
    registerPending: false,
    loginPending: false,
    auth: false,
    loginError: '',
};

const UserReducer = ( state = initialState, action) => {
    switch (action.type) {
        case USER_REGISTER_START: {
            return { ...state, registerPending: true }
        }
        case AUTH_SUCCESS: {
            return { ...state, auth: true }
        }
        case USER_LOGIN_START: {
            return { ...state, loginPending: true };
        }
        case USER_LOGIN_SUCCESS : {
            return { ...state, loginPending:false, auth: true }
        }
        case USER_LOGIN_ERROR: {
            return { ...state, loginError: action.payload, loginPending:false }
        }
        case USER_LOG_OUT: {
            return { ...state, auth: false }
        }
        default: {
            return state;
        }
    }
};

export default UserReducer