import {
    PRINTING_ORDER_DELIVERED_FAIL,
    PRINTING_ORDER_DELIVERED_REQUEST,
    PRINTING_ORDER_DELIVERED_SUCCESS,
    PRINTING_ORDER_DETAILS_FAIL,
    PRINTING_ORDER_DETAILS_REQUEST,
    PRINTING_ORDER_DETAILS_SUCCESS,
    PRINTING_ORDER_EDIT_SUCCESS,
    PRINTING_ORDER_LIST_FAIL,
    PRINTING_ORDER_LIST_REQUEST,
    PRINTING_ORDER_LIST_SUCCESS,
    PRINTING_ORDER_UPDATE_FAIL,
    PRINTING_ORDER_UPDATE_REQUEST,
    PRINTING_ORDER_UPDATE_SUCCESS,
  } from "../Constants/PrintingOrderConstants";
  import { logout } from "./userActions";
  import axios from "axios";
  
  export const listPrintingOrders = () => async (dispatch, getState) => {
    try {
      dispatch({ type: PRINTING_ORDER_LIST_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  

      const { data } = await axios.get(`/api/printorder/a/?acceptedby=${userInfo.user._id}`, config);

      dispatch({ type: PRINTING_ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRINTING_ORDER_LIST_FAIL,
        payload: message,
      });
    }
  };
  
  // PRINTING_ORDER DETAILS
  export const getPrintingOrderDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRINTING_ORDER_DETAILS_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/printorder/print/${id}`, config);
      console.log(data)
      dispatch({ type: PRINTING_ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRINTING_ORDER_DETAILS_FAIL,
        payload: message,
      });
    }
  };
  
  // PRINTING_ORDER DELIVER
  export const deliverPrintingOrder = (order) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRINTING_ORDER_DELIVERED_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(
        `/api/printorder/${order._id}/`,
        {},
        config
      );
      dispatch({ type: PRINTING_ORDER_DELIVERED_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRINTING_ORDER_DELIVERED_FAIL,
        payload: message,
      });
    }
  };



  export const updateprintOrder = (order) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRINTING_ORDER_UPDATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.put(`/api/printorder/${order.id}`, order, config);
  
      dispatch({ type: PRINTING_ORDER_UPDATE_SUCCESS, payload: data });
      dispatch({ type: PRINTING_ORDER_EDIT_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRINTING_ORDER_UPDATE_FAIL,
        payload: message,
      });
    }
  };
  
  