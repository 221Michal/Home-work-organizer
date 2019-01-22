import callApi from "../api";
import { 
    TASK_FETCH_ALL_FOR_USER_START,
    TASK_FETCH_ALL_FOR_USER_SUCCES
 } from "../constants/ActionsConst";

export function fetchAllUserTask() {
    return function(dispatch) {
        dispatch({ type: TASK_FETCH_ALL_FOR_USER_START})
        callApi('/task', 'get', null, localStorage.getItem("token"))
        .then(data => {
            if (data.task) dispatch({ type: TASK_FETCH_ALL_FOR_USER_SUCCES, payload:data. task })
        })
    }
}