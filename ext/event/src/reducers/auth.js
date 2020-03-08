import { ADD_AUTH, REVOKE_AUTH, addAuth, revokeAuth } from "../actions";

const initialState = false;
const axios = require("axios");

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_AUTH:
      return true;
    case REVOKE_AUTH:
      return false;
    default:
      return state;
  }
};

export const authCheck = () => async (dispatch, getState) => {
  try {
    console.log("in auth check about to make req");
    let res = (
      await axios.request({
        method: "get",
        url: "https://23.100.26.70/get"
      })
    ).data;
    console.log(res);
    // if "" you are not logged in

    // if (res.success) {
    //   await dispatch(addAuth());
    //   chrome.runtime.sendMessage("Pull Request", function(response) {});
    // } else {
    //   await dispatch(revokeAuth());
    //   console.log("done!");
    // }
    return;
  } catch (error) {
    console.error(error);
  }
  return;
};
