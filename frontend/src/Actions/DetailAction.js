import axios from "axios";
import {
  DETAIL_GET_APPLY_FAIL,
  DETAIL_GET_APPLY_REQUEST,
  DETAIL_GET_APPLY_SUCCESS,
  DETAIL_GET_FAIL,
  DETAIL_GET_REQUEST,
  DETAIL_GET_SUCCESS,
  DETAIL_POST_FAIL,
  DETAIL_POST_REQUEST,
  DETAIL_POST_SUCCESS,
} from "../constants/DetailConstant";

export const DetailsPost = (values) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DETAIL_POST_REQUEST,
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
    const { data } = await axios.post("/applyDetail", values, config);
    dispatch({
      type: DETAIL_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_POST_FAIL,
      payload: error.response.data,
    });
  }
};

export const readdetail = (Id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DETAIL_GET_REQUEST,
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
    const { data } = await axios.get(`/applyDetail/${Id}`, config);

    dispatch({
      type: DETAIL_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const ReadJobApply = (Id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DETAIL_GET_APPLY_REQUEST,
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
    const { data } = await axios.get(`/applyDetail/student/${Id}`, config);

    // const values = data.filter((d) => d.Email === userInfo.email);

    dispatch({
      type: DETAIL_GET_APPLY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_GET_APPLY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
