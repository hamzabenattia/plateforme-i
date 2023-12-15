import {
    SLIDESHOW_CREATE_FAIL,
    SLIDESHOW_CREATE_REQUEST,
    SLIDESHOW_CREATE_SUCCESS,
    SLIDESHOW_DELETE_FAIL,
    SLIDESHOW_DELETE_REQUEST,
    SLIDESHOW_DELETE_SUCCESS,
    SLIDESHOW_LIST_FAIL,
    SLIDESHOW_LIST_REQUEST,
    SLIDESHOW_LIST_SUCCESS
}from "../Constants/SlideShowConstant"
import axios from "axios";
import { logout } from "./userActions";

export const listslide = () => async (dispatch, getState) => {
    try {
      dispatch({ type: SLIDESHOW_LIST_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/slide/`, config);
  
      dispatch({ type: SLIDESHOW_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: SLIDESHOW_LIST_FAIL,
        payload: message,
      });
    }
  };


  export const createslide =
  (image,url) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: SLIDESHOW_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/slide/`,
        { image, url },
        config
      );

      dispatch({ type: SLIDESHOW_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: SLIDESHOW_CREATE_FAIL,
        payload: message,
      });
    }
  };

  
  
// DELETE 
export const deleteslide = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SLIDESHOW_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/slide/${id}`, config);

    dispatch({ type: SLIDESHOW_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: SLIDESHOW_DELETE_FAIL,
      payload: message,
    });
  }
};
