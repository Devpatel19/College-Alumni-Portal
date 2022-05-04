import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_APPROVAL_REQUEST,
  USER_APPROVAL_SUCCESS,
  USER_APPROVAL_FAIL,
  USER_LOGOUT,
  USER_PASSWORD_REST_REQUEST,
  USER_PASSWORD_REST_SUCCESS,
  USER_PASSWORD_REST_FAIL,
  USER_PASSWORD_CHANGE_REQUEST,
  USER_PASSWORD_CHANGE_FAIL,
  USER_PASSWORD_CHANGE_SUCCESS,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
} from "../constants/userconstant";
import baseService from "../services/baseService";

export const signup = (values) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const { data } = await baseService.post("/users", values, config);
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    // dispatch({
    //     type: USER_LOGIN_SUCCESS,
    //     payload: data
    // })

    // localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response.data,
    });
  }
};

export const login = (values) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const { data } = await baseService.post("/users/login", values, config);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response,
    });
  }
};

export const readalluser = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
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
    const { data } = await baseService.get("/users", config);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const Aprroval = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_APPROVAL_REQUEST,
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
    const { data } = await baseService.patch(
      `/user/verify/${user._id}`,
      user,
      config
    );
    console.log({ data });

    dispatch({
      type: USER_APPROVAL_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_APPROVAL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("ProfileInfo");
  dispatch({ type: USER_LOGOUT });
};

export const resetPassword = (Email) => async (dispatch) => {
  try {
    const values = { email: Email };
    dispatch({
      type: USER_PASSWORD_REST_REQUEST,
    });
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const { data } = await baseService.post(
      "/users/forgotpassword",
      values,
      config
    );
    dispatch({
      type: USER_PASSWORD_REST_SUCCESS,
      payload: data,
    });
    localStorage.setItem("ResetEmail", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_PASSWORD_REST_FAIL,
      payload: error.response.data,
    });
  }
};

export const changePasswords = (news) => async (dispatch) => {
  try {
    dispatch({
      type: USER_PASSWORD_CHANGE_REQUEST,
    });
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const { data } = await baseService.patch(
      "/user/passwordchange",
      news,
      config
    );

    dispatch({
      type: USER_PASSWORD_CHANGE_SUCCESS,
      payload: data,
    });
    // localStorage.setItem('ResetEmail',JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_PASSWORD_CHANGE_FAIL,
      payload: error.response.data,
    });
  }
};

export const deleteuser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await baseService.delete(`/user/delete/${id}`, config);

    dispatch({
      type: USER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
