import {
  UPLOAD_POST_FAIL,
  UPLOAD_POST_REQUEST,
  UPLOAD_POST_SUCCESS,
} from "../constants/uploadConstant";
import baseService from "../services/baseService";
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
    const { data } = await baseService.post("/api/upload", formData, config);
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
