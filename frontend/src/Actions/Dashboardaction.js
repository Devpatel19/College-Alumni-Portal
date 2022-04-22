import {
  USER_DASHBOARD_FAIL,
  USER_DASHBOARD_REQUEST,
  USER_DASHBOARD_SUCCESS,
} from "../constants/dashboardConstant";
import baseService from "../services/baseService";

export const dashboardDetail = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DASHBOARD_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "content-type": "application/json",
      },
    };
    const { data } = await baseService.get(`/length`, config);
    dispatch({
      type: USER_DASHBOARD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DASHBOARD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
