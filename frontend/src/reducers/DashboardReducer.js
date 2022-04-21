import {
  USER_DASHBOARD_FAIL,
  USER_DASHBOARD_REQUEST,
  USER_DASHBOARD_SUCCESS,
} from "../constants/dashboardConstant";

export const DashboardReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DASHBOARD_REQUEST:
      return { loading: true };
    case USER_DASHBOARD_SUCCESS:
      return { loading: false, DetailDashboard: action.payload };
    case USER_DASHBOARD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
