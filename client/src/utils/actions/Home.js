import callApi from "../api";
import { 
    HOME_INFO_START,
    HOME_INFO_SUCCES,
    HOME_INFO_ERROR
 } from "../constants/ActionsConst";

 export function getHomeInfo(homeId) {
     return function(dispatch) {
        dispatch({ type: HOME_INFO_START })
        callApi(`home/${homeId}`, 'get', null, localStorage.getItem("token"))
        .then(data => {
            dispatch({
                type: HOME_INFO_SUCCES,
                payload: data.home
            })
        })
     }
 }