import { DETAIL_GET_APPLY_FAIL, DETAIL_GET_APPLY_REQUEST, DETAIL_GET_APPLY_SUCCESS, DETAIL_GET_FAIL, DETAIL_GET_REQUEST, DETAIL_GET_SUCCESS, DETAIL_POST_FAIL, DETAIL_POST_REQUEST, DETAIL_POST_SUCCESS } from "../constants/DetailConstant"

export const DetailPostReducer = (state = { },action) => {
    switch(action.type){
        case DETAIL_POST_REQUEST:
            return { loading: true}
        case DETAIL_POST_SUCCESS:
            return { loading: false, DetailInfo: action.payload }
        case DETAIL_POST_FAIL:
            return { loading: false,error: action.payload }
        default:
            return state
    }
}


export const DetailReadReducer = (state = { Details: [] }, action) => {
    switch(action.type){
        case DETAIL_GET_REQUEST:
            return { loading: true}
        case DETAIL_GET_SUCCESS:
            return { loading: false, Details: action.payload }
        case DETAIL_GET_FAIL:
            return { loading: false,error: action.payload }
        default:
            return state
    }
}

export const DetailApplyReducer = (state = { MyApplyJob: [] }, action) => {
    switch(action.type){
        case DETAIL_GET_APPLY_REQUEST:
            return { loading: true}
        case DETAIL_GET_APPLY_SUCCESS:
            return { loading: false, MyApplyJob: action.payload }
        case DETAIL_GET_APPLY_FAIL:
            return { loading: false,error: action.payload }
        default:
            return state
    }
}