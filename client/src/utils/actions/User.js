import callApi from "../api";
import { USER_LOGIN_START } from "../constants/ActionsConst";

export function userLogin( email, password ) {
    return function (dispatch) {
        dispatch({ type: USER_LOGIN_START })
        callApi('api/user/login', 'post', { email, password })
        .then(data => {

        })
    }
}