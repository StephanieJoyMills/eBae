import { SET_CATEGORY } from "../actions";

const initialState = { index: null, category: null };
const axios = require("axios");

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      if (state.index !== action.payload.index) {
        //   set other thing to null in here
        return {
          id: action.payload.id,
          category: action.payload.category
        };
      } else {
        return Object.assign({}, state, {
          id: action.payload.id,
          category: action.payload.category
        });
      }
    default:
      return state;
  }
};
