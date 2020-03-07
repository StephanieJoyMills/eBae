import { ADD_COUNT } from "../actions";
import { ADD_CONFIG, addConfig } from "../actions";
// import api from "../api";
const initialState = 0;
const axios = require("axios");

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_COUNT":
      return state;
    case ADD_CONFIG:
      return state + 1;
    // return { ...state, ...{ appConfig: action.payload.config } };
    default:
      return state;
  }
};

export const getConfig = () => async (dispatch, getState) => {
  try {
    const basePath = "http://localhost:3000/api";
    let response = await axios.get(`${basePath}/config`);
    dispatch(addConfig(response.data));
  } catch (error) {
    console.error(error);
  }
  return;
};
