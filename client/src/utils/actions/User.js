import callApi from "../api";
import {
    USER_REGISTER_START,
    USER_LOGIN_START,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_ERROR,
    USER_INFO_START,
    USER_INFO_SUCCESS,
    USER_INFO_ERROR,
    USER_LOG_OUT,
} from "../constants/ActionsConst";

export function userRegister(email, username, password) {
    return function (dispatch) {
        dispatch({ type: USER_REGISTER_START });
        callApi('user/register', 'post', { email, username, password })
            .then(data => {
            })
    }
}

export function userLogin(email, password, goToUrl) {
    return function (dispatch) {
        dispatch({ type: USER_LOGIN_START })
        callApi('user/login', 'post', { email, password })
            .then(data => {
                if (data.token) {
                    localStorage.setItem('token', `Token ${data.token}`);
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

export function userInfo() {
    return function (dispatch) {
        dispatch({ type: USER_INFO_START })
        callApi('user/current', 'get', null, localStorage.getItem("token"))
        .then(data => {
            if (data.user) {
                dispatch({ type: USER_INFO_SUCCESS, payload: data.user})
            }
        })
        .catch(err => {
            dispatch({type: USER_INFO_ERROR, payload: err.message})
        })
    }
}

export function userLogOut() {
    return function (dispatch) {
        localStorage.removeItem('token');
        dispatch({ type: USER_LOG_OUT });
    }
}
