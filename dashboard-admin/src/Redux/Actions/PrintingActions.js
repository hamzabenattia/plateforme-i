import {
    PRINTING_ORDER_DELIVERED_FAIL,
    PRINTING_ORDER_DELIVERED_REQUEST,
    PRINTING_ORDER_DELIVERED_SUCCESS,
    PRINTING_ORDER_DETAILS_FAIL,
    PRINTING_ORDER_DETAILS_REQUEST,
    PRINTING_ORDER_DETAILS_SUCCESS,
    PRINTING_ORDER_LIST_FAIL,
    PRINTING_ORDER_LIST_REQUEST,
    PRINTING_ORDER_LIST_SUCCESS,
  } from "../Constants/PrintingOrderConstants";
  import { logout } from "./userActions";
  import axios from "axios";
  
  export const listPrintingOrders = (id) => async (dispatch, getState) => {
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
  
      const { data } = await axios.get(`/api/printorder/a/?acceptedby=${id}`, config);
  console.log(data)
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
  
      const { data } = await axios.get(`/api/printorder/a/?order=${id}`, config);
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
  
      const { data } = await axios.put(
        `/api/orders/${order._id}/delivered`,
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
  