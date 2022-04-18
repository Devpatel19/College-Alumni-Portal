import { UPLOAD_POST_FAIL, UPLOAD_POST_REQUEST, UPLOAD_POST_SUCCESS } from "../constants/uploadConstant"

export const uploadReducer = (state = { },action) => {
    switch(action.type){
        case UPLOAD_POST_REQUEST:
            return { loading: true}
        case UPLOAD_POST_SUCCESS:
            return { loading: false, images: action.payload }
        case UPLOAD_POST_FAIL:
            return { loading: false,error: action.payload }
        default:
            return state
    }
}