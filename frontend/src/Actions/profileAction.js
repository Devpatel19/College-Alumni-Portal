import axios from "axios";
import {
  PROFILE_GET_ALL_FAIL,
  PROFILE_GET_ALL_REQUEST,
  PROFILE_GET_ALL_SUCCESS,
  PROFILE_GET_FAIL,
  PROFILE_GET_REQUEST,
  PROFILE_GET_SUCCESS,
  PROFILE_POST_FAIL,
  PROFILE_POST_REQUEST,
  PROFILE_POST_SUCCESS,
  PROFILE_UPDATE_FAIL,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
} from "../constants/profieConstant";

export const profilesPost = (values) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_POST_REQUEST,
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
    const { data } = await axios.post(`/profile`, values, config);

    dispatch({
      type: PROFILE_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_POST_FAIL,
      payload: error.response.data,
    });
  }
};

export const profilesRead = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_GET_REQUEST,
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
    const { data } = await axios.get(`/profile/${userInfo._id}`, config);
    dispatch({
      type: PROFILE_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_GET_FAIL,
      payload: error.response,
    });
  }
};

export const Updateprofile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_UPDATE_REQUEST,
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
    const { data } = await axios.patch(
      `/profile/${userInfo._id}`,
      user,
      config
    );
    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const allprofilesRead = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_GET_ALL_REQUEST,
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
    const { data } = await axios.get(`/profiles`, config);
    dispatch({
      type: PROFILE_GET_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_GET_ALL_FAIL,
      payload: error.response,
    });
  }
};
