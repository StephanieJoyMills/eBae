import { addExtSchema, ADD_EXT_SCHEMA } from "../actions";

const initialState = { categories: {}, types: {} };
const axios = require("axios");

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_EXT_SCHEMA:
      return Object.assign({}, state, {
        ...action.payload
      });
    default:
      return state;
  }
};

export const getExtSchema = () => async (dispatch, getState) => {
  try {
    const basePath = "http://localhost:3000/api";
    let response = await axios.get(`${basePath}/getExtSchema`);
    dispatch(addExtSchema(response.data));
  } catch (error) {
    console.error(error);
  }
  return;
};
