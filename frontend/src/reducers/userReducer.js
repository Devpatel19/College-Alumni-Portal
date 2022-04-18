import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_APPROVAL_REQUEST,
  USER_APPROVAL_SUCCESS,
  USER_APPROVAL_FAIL,
  USER_PASSWORD_REST_REQUEST,
  USER_PASSWORD_REST_SUCCESS,
  USER_PASSWORD_REST_FAIL,
  USER_PASSWORD_CHANGE_FAIL,
  USER_PASSWORD_CHANGE_REQUEST,
  USER_PASSWORD_CHANGE_SUCCESS,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
} from "../constants/userconstant";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userApprovalReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_APPROVAL_REQUEST:
      return { loading: true };
    case USER_APPROVAL_SUCCESS:
      return { loading: false, success: action.payload };
    case USER_APPROVAL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userResetpassword = (state = {}, action) => {
  switch (action.type) {
    case USER_PASSWORD_REST_REQUEST:
      return { loading: true };
    case USER_PASSWORD_REST_SUCCESS:
      return { loading: false, emailInfo: action.payload };
    case USER_PASSWORD_REST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userchangepassword = (state = {}, action) => {
  switch (action.type) {
    case USER_PASSWORD_CHANGE_REQUEST:
      return { loading: true };
    case USER_PASSWORD_CHANGE_SUCCESS:
      return { loading: false, changePassword: action.payload };
    case USER_PASSWORD_CHANGE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, userd: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
