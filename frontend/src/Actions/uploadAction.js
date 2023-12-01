import axios from "axios";
import {
  UPLOAD_POST_FAIL,
  UPLOAD_POST_REQUEST,
  UPLOAD_POST_SUCCESS,
} from "../constants/uploadConstant";
import { NODE_URL } from "../constants/backendURL";

export const UploadImage = (values) => async (dispatch) => {
  const file = values;

  const formData = new FormData();
  formData.append("image", file);

  try {
    dispatch({
      type: UPLOAD_POST_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(`${NODE_URL}/api/upload`, formData, config);
    dispatch({
      type: UPLOAD_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPLOAD_POST_FAIL,
      payload: error.response.data,
    });
  }
};
