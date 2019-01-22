import { 
    TASK_FETCH_ALL_FOR_USER_START,
    TASK_FETCH_ALL_FOR_USER_SUCCES
 } from "../constants/ActionsConst";

 const initialState = {
    userTaskPending: false,
    userTasks: []
};

const TaskReducer = ( state = initialState, action) => {
    switch (action.type) {
        case TASK_FETCH_ALL_FOR_USER_START: {
            return { ...state, userTaskPending: true }
        }
        case TASK_FETCH_ALL_FOR_USER_SUCCES: {
            return { ...state, userTaskPending: false, userTasks: action.payload }
        }
        default: {
            return state;
        }
    }
}

export default TaskReducer