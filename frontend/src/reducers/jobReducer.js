import { JOB_DELETE_FAIL, JOB_DELETE_REQUEST, JOB_DELETE_SUCCESS, JOB_GET_FAIL, JOB_GET_OWNER_FAIL, JOB_GET_OWNER_REQUEST, JOB_GET_OWNER_SUCCESS, JOB_GET_REQUEST, JOB_GET_SUCCESS, JOB_POST_FAIL, JOB_POST_REQUEST, JOB_POST_SUCCESS, JOB_UPDATE_FAIL, JOB_UPDATE_REQUEST, JOB_UPDATE_SUCCESS } from "../constants/jobConstant"

export const jobPostReducer = (state = { }, action) => {
    switch(action.type){
        case JOB_POST_REQUEST:
            return { loading: true}
        case JOB_POST_SUCCESS:
            return { loading: false, JobInfo: action.payload }
        case JOB_POST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state

    }
}

export const jobListReducer = (state = { jobs: [] }, action) => {
    switch(action.type){
        case JOB_GET_REQUEST:
            return { loading: true}
        case JOB_GET_SUCCESS:
            return { loading: false, jobs: action.payload }
        case JOB_GET_FAIL:
            return { loading: false,error: action.payload }
        default:
            return state
    }
}

export const jobReadReducer = (state = { jobs: [] }, action) => {
    switch(action.type){
        case JOB_GET_OWNER_REQUEST:
            return { loading: true}
        case JOB_GET_OWNER_SUCCESS:
            return { loading: false, jobs: action.payload }
        case JOB_GET_OWNER_FAIL:
            return { loading: false,error: action.payload }
        default:
            return state
    }
}

export const jobDeleteReducer = (state = {  }, action) => {
    switch(action.type){
        case JOB_DELETE_REQUEST:
            return { loading: true}
        case JOB_DELETE_SUCCESS:
            return { loading: false, successd: true }
        case JOB_DELETE_FAIL:
            return { loading: false,error: action.payload }
        default:
            return state

    }
}

export const jobUpdateReducer = (state = {  }, action) => {
    switch(action.type){
        case JOB_UPDATE_REQUEST:
            return { loading: true}
        case JOB_UPDATE_SUCCESS:
            return { loading: false, success: true }
        case JOB_UPDATE_FAIL:
            return { loading: false,error: action.payload }
        default:
            return state

    }
}