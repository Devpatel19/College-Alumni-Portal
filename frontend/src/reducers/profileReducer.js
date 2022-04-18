import { PROFILE_GET_ALL_FAIL, PROFILE_GET_ALL_REQUEST, PROFILE_GET_ALL_SUCCESS, PROFILE_GET_FAIL, PROFILE_GET_REQUEST, PROFILE_GET_SUCCESS, PROFILE_POST_FAIL, PROFILE_POST_REQUEST, PROFILE_POST_SUCCESS, PROFILE_UPDATE_FAIL, PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_SUCCESS } from "../constants/profieConstant"

export const profilePostReducer = (state = { }, action) => {
    switch(action.type){
        case PROFILE_POST_REQUEST:
            return { loading: true}
        case PROFILE_POST_SUCCESS:
            return { loading: false, profileInfo: action.payload }
        case PROFILE_POST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const profileReadReducer = (state = {}, action) => {
    switch(action.type){
        case PROFILE_GET_REQUEST:
            return { loading: true}
        case PROFILE_GET_SUCCESS:
            return { loading: false, ProfileInfo: action.payload }
        case PROFILE_GET_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const profileUpdateReducer = (state = {}, action) => {
    switch(action.type){
        case PROFILE_UPDATE_REQUEST:
            return { loading: true}
        case PROFILE_UPDATE_SUCCESS:
            return { loading: false, ProfileInfoupdate: true }
        case PROFILE_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const allprofileReadReducer = (state = { AllProfiles: [] }, action) => {
    switch(action.type){
        case PROFILE_GET_ALL_REQUEST:
            return { loading: true}
        case PROFILE_GET_ALL_SUCCESS:
            return { loading: false, AllProfiles: action.payload }
        case PROFILE_GET_ALL_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}