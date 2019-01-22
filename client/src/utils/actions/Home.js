import callApi from "../api";
import { 
    HOME_INFO_START,
    HOME_INFO_SUCCES,
    HOME_INFO_ERROR,
    HOME_CREATE_START,
    HOME_CREATE_SUCCES,
    HOME_CREATE_ERROR,
    HOME_SEND_REQUEST_START,
    HOME_SEND_REQUEST_SUCCES,
    HOME_SEND_REQUEST_ERROR
 } from "../constants/ActionsConst";

 export function getHomeInfo(homeId) {
     return function(dispatch) {
        dispatch({ type: HOME_INFO_START });
        callApi(`home/${homeId}`, 'get', null, localStorage.getItem("token"))
        .then(data => {
            dispatch({
                type: HOME_INFO_SUCCES,
                payload: data.home
            })
        })
     }
 }

 export function createNewHome (homeName) {
     return function(dispatch) {
        dispatch({ type: HOME_CREATE_START });
        callApi('home/create', "post", {homeName}, localStorage.getItem("token"))
        .then(data => {
            dispatch({
                type: HOME_CREATE_SUCCES,
                payload: data
            })
        })
     }
 }

 export function sendRequestToHome (userEmail, homeId) {
     return function(dispatch) {
        dispatch({ type: HOME_SEND_REQUEST_START});
        callApi(`home/send/request/${userEmail}`, 'post', {homeId}, localStorage.getItem("token"))
        .then(data => {
            dispatch({
                type: HOME_SEND_REQUEST_SUCCES,
                payload: data
            })
        })
     }
 }