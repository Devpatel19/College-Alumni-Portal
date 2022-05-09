import {
  combineReducers,
  applyMiddleware,
  createStore,
} from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  eventListReducer,
  eventPostReducer,
  eventUpdateReducer,
  eventDeleteReducer,
} from "../reducers/eventReducer";
import {
  jobDeleteReducer,
  jobListReducer,
  jobListReducerPage,
  jobPostReducer,
  jobReadReducer,
  jobUpdateReducer,
} from "../reducers/jobReducer";
import {
  userApprovalReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userResetpassword,
  userchangepassword,
  userDeleteReducer,
} from "../reducers/userReducer";
import {
  profilePostReducer,
  profileReadReducer,
  profileUpdateReducer,
  allprofileReadReducer,
} from "../reducers/profileReducer";
import {
  DetailPostReducer,
  DetailReadReducer,
  DetailApplyReducer,
} from "../reducers/detailReducer";
import { DashboardReducer } from "../reducers/DashboardReducer";
import { uploadReducer } from "../reducers/uploadReducer";
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userList: userListReducer,
  userApproval: userApprovalReducer,
  JobPost: jobPostReducer,
  JobList: jobListReducer,
  EventPost: eventPostReducer,
  EventList: eventListReducer,
  profilePost: profilePostReducer,
  uploadImage: uploadReducer,
  profileRead: profileReadReducer,
  updateProfile: profileUpdateReducer,
  ReadJob: jobReadReducer,
  DeleteJob: jobDeleteReducer,
  UpdateJob: jobUpdateReducer,
  UpdateEvent: eventUpdateReducer,
  DeleteEvent: eventDeleteReducer,
  DetailsPost: DetailPostReducer,
  DetailRead: DetailReadReducer,
  DetailApply: DetailApplyReducer,
  AllProfile: allprofileReadReducer,
  ResetPassword: userResetpassword,
  ChangePassword: userchangepassword,
  DashboardDetail: DashboardReducer,
  DeleteUser: userDeleteReducer,
  JobPage: jobListReducerPage,
});
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const intialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];
const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    return reducer(undefined, action);
  }

  return reducer(state, action);
};

const store = createStore(
  rootReducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const reducers = reducer;
export default store;
