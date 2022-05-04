import axios from "axios";
import {
  JOB_DELETE_FAIL,
  JOB_DELETE_REQUEST,
  JOB_DELETE_SUCCESS,
  JOB_GET_FAIL,
  JOB_GET_OWNER_FAIL,
  JOB_GET_OWNER_REQUEST,
  JOB_GET_OWNER_SUCCESS,
  JOB_GET_REQUEST,
  JOB_GET_SUCCESS,
  JOB_POST_FAIL,
  JOB_POST_REQUEST,
  JOB_POST_SUCCESS,
  JOB_UPDATE_FAIL,
  JOB_UPDATE_REQUEST,
  JOB_UPDATE_SUCCESS,
} from "../constants/jobConstant";

export const jobPost = (values) => async (dispatch, getState) => {
  try {
    dispatch({
      type: JOB_POST_REQUEST,
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
    const { data } = await axios.post("/job", values, config);

    dispatch({
      type: JOB_POST_SUCCESS,
      payload: data.msg,
    });
  } catch (error) {
    dispatch({
      type: JOB_POST_FAIL,
      payload: error.response.data,
    });
  }
};

export const readalljobs = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: JOB_GET_REQUEST,
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
    const { data } = await axios.get("/jobs", config);

    dispatch({
      type: JOB_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: JOB_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const readJob = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: JOB_GET_OWNER_REQUEST,
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
    const { data } = await axios.get(`/jobs/${userInfo._id}`, config);

    dispatch({
      type: JOB_GET_OWNER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: JOB_GET_OWNER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletejob = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: JOB_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/jobs/${id}`, config);

    dispatch({
      type: JOB_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: JOB_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateJob = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: JOB_UPDATE_REQUEST,
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

    const { data } = await axios.patch(`/jobs/${user._id}`, user, config);

    dispatch({
      type: JOB_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: JOB_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
