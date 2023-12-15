import {
    PRINTING_ORDER_DELIVERED_FAIL,
    PRINTING_ORDER_DELIVERED_REQUEST,
    PRINTING_ORDER_DELIVERED_RESET,
    PRINTING_ORDER_DELIVERED_SUCCESS,
    PRINTING_ORDER_DETAILS_FAIL,
    PRINTING_ORDER_DETAILS_REQUEST,
    PRINTING_ORDER_DETAILS_SUCCESS,
    PRINTING_ORDER_LIST_FAIL,
    PRINTING_ORDER_LIST_REQUEST,
    PRINTING_ORDER_LIST_SUCCESS,
    PRINTING_ORDER_UPDATE_FAIL,
    PRINTING_ORDER_UPDATE_REQUEST,
    PRINTING_ORDER_UPDATE_RESET,
    PRINTING_ORDER_UPDATE_SUCCESS,
  } from "../Constants/PrintingOrderConstants";
  
  export const printingorderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case PRINTING_ORDER_LIST_REQUEST:
        return { loading: true };
      case PRINTING_ORDER_LIST_SUCCESS:
        return { loading: false, orders: action.payload };
      case PRINTING_ORDER_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // PRINTING_ORDER DETAILS
  export const printingorderDetailsReducer = (
    state = { loading: true, orderItems: [], shippingAddress: {} },
    action
  ) => {
    switch (action.type) {
      case PRINTING_ORDER_DETAILS_REQUEST:
        return { ...state, loading: true };
      case PRINTING_ORDER_DETAILS_SUCCESS:
        return { loading: false, order: action.payload };
      case PRINTING_ORDER_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // PRINTING_ORDER DELIVERED
  export const printingorderDeliveredReducer = (state = {}, action) => {
    switch (action.type) {
      case PRINTING_ORDER_DELIVERED_REQUEST:
        return { loading: true };
      case PRINTING_ORDER_DELIVERED_SUCCESS:
        return { loading: false, success: true };
      case PRINTING_ORDER_DELIVERED_FAIL:
        return { loading: false, error: action.payload };
      case PRINTING_ORDER_DELIVERED_RESET:
        return {};
      default:
        return state;
    }
  };

  
export const PrintingOrderUpdateReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case PRINTING_ORDER_UPDATE_REQUEST:
      return { loading: true };
    case PRINTING_ORDER_UPDATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case PRINTING_ORDER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRINTING_ORDER_UPDATE_RESET:
      return { order: {} };
    default:
      return state;
  }
};
  