import { EVENT_DELETE_FAIL, EVENT_DELETE_REQUEST, EVENT_DELETE_SUCCESS, EVENT_GET_FAIL, EVENT_GET_REQUEST, EVENT_GET_SUCCESS, EVENT_POST_FAIL, EVENT_POST_REQUEST, EVENT_POST_SUCCESS, EVENT_UPDATE_FAIL, EVENT_UPDATE_REQUEST, EVENT_UPDATE_SUCCESS } from "../constants/eventConstant"

export const eventPostReducer = (state = { }, action) => {
    switch(action.type){
        case EVENT_POST_REQUEST:
            return { loading: true}
        case EVENT_POST_SUCCESS:
            return { loading: false, EventInfo: action.payload }
        case EVENT_POST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state

    }
}

export const eventListReducer = (state = { events: [] }, action) => {
    switch(action.type){
        case EVENT_GET_REQUEST:
            return { loading: true}
        case EVENT_GET_SUCCESS:
            return { loading: false, events: action.payload }
        case EVENT_GET_FAIL:
            return { loading: false,error: action.payload }
        default:
            return state
    }
}

export const eventUpdateReducer = (state = {  }, action) => {
    switch(action.type){
        case EVENT_UPDATE_REQUEST:
            return { loading: true}
        case EVENT_UPDATE_SUCCESS:
            return { loading: false, event: action.payload }
        case EVENT_UPDATE_FAIL:
            return { loading: false,error: action.payload }
        default:
            return state
    }
}

export const eventDeleteReducer = (state = {  }, action) => {
    switch(action.type){
        case EVENT_DELETE_REQUEST:
            return { loading: true}
        case EVENT_DELETE_SUCCESS:
            return { loading: false, eventd: true }
        case EVENT_DELETE_FAIL:
            return { loading: false,error: action.payload }
        default:
            return state
    }
}