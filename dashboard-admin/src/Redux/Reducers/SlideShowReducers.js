import {
    SLIDESHOW_CREATE_FAIL,
    SLIDESHOW_CREATE_REQUEST,
    SLIDESHOW_CREATE_SUCCESS,
    SLIDESHOW_DELETE_FAIL,
    SLIDESHOW_DELETE_REQUEST,
    SLIDESHOW_DELETE_SUCCESS,
    SLIDESHOW_LIST_FAIL,
    SLIDESHOW_LIST_REQUEST,
    SLIDESHOW_LIST_SUCCESS,
    SLIDESHOW_CREATE_RESET
  }from "../Constants/SlideShowConstant"
  
  // ALL slide
  export const slideListReducer = (state = { slides: [] }, action) => {
      switch (action.type) {
        case SLIDESHOW_LIST_REQUEST:
          return { loading: true, slides: [] };
        case SLIDESHOW_LIST_SUCCESS:
          return { loading: false, slides: action.payload };
        case SLIDESHOW_LIST_FAIL:
          return { loading: false, error: action.payload };
        default:
          return state;
      }
    };
    
  
    // CREATEe SLIDESHOW
  export const slideCreateReducer = (state = {}, action) => {
      switch (action.type) {
        case SLIDESHOW_CREATE_REQUEST:
          return { loading: true };
        case SLIDESHOW_CREATE_SUCCESS:
          return { loading: false, success: true, slide: action.payload };
        case SLIDESHOW_CREATE_FAIL:
          return { loading: false, error: action.payload };
        case SLIDESHOW_CREATE_RESET:
          return {};
        default:
          return state;
      }
    };
  
    // DELETE SLIDESHOW
  export const slideDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case SLIDESHOW_DELETE_REQUEST:
        return { loading: true };
      case SLIDESHOW_DELETE_SUCCESS:
        return { loading: false, success: true };
      case SLIDESHOW_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
    
  