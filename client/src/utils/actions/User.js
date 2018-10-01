import callApi from "../api";
import {
    USER_REGISTER_START,
    USER_LOGIN_START,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_ERROR,
    USER_LOG_OUT,
} from "../constants/ActionsConst";

export function userRegister(email, username, password) {
    return function (dispatch) {
        dispatch({ type: USER_REGISTER_START });
        callApi('api/user/register', 'post', { email, username, password })
            .then(data => {
            })
    }
}

export function userLogin(email, password, goToUrl) {
    return function (dispatch) {
        dispatch({ type: USER_LOGIN_START })
        callApi('api/user/login', 'post', { email, password })
            .then(data => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    dispatch({ type: USER_LOGIN_SUCCESS });
                    goToUrl();
                }
                else dispatch({ type: USER_LOGIN_ERROR, payload: data.message });
            })
            .catch(err => {
                dispatch({ type: USER_LOGIN_ERROR, payload: err.message });
            })
    }
}

export function userLogOut() {
    return function (dispatch) {
        localStorage.removeItem('token');
        dispatch({ type: USER_LOG_OUT });
    }
}
