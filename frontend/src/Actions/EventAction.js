import axios from "axios";
import {
  EVENT_DELETE_FAIL,
  EVENT_DELETE_REQUEST,
  EVENT_DELETE_SUCCESS,
  EVENT_GET_FAIL,
  EVENT_GET_REQUEST,
  EVENT_GET_SUCCESS,
  EVENT_POST_FAIL,
  EVENT_POST_REQUEST,
  EVENT_POST_SUCCESS,
  EVENT_UPDATE_FAIL,
  EVENT_UPDATE_REQUEST,
  EVENT_UPDATE_SUCCESS,
} from "../constants/eventConstant";

export const eventPost = (values) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVENT_POST_REQUEST,
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
    const { data } = await axios.post(`/event`, values, config);

    dispatch({
      type: EVENT_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_POST_FAIL,
      payload: error.response.data,
    });
  }
};

export const readallevents = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVENT_GET_REQUEST,
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
    const { data } = await axios.get(`/event`, config);

    dispatch({
      type: EVENT_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateEvent = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVENT_UPDATE_REQUEST,
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
    const { data } = await axios.patch(`/event/${user._id}`, user, config);

    dispatch({
      type: EVENT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteevent = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVENT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/event/${id}`, config);

    dispatch({
      type: EVENT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: EVENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
