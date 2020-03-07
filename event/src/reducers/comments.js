import {
  ADD_COMMENT_EXT,
  ADD_COMMENT_EXT_STARTED,
  addCommentExt,
  addCommentExtStarted
} from "../actions";

const initialState = {};
const axios = require("axios");

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT_EXT:
      return Object.assign({}, state, {
        ...action.payload
      });
    // return {
    //   exts: { ...state.exts, ...action.payload }
    // };
    default:
      return state;
  }
};
// should be using cat id
export const upsertCommentExt = (
  prId,
  commentId,
  category,
  type,
  urgency,
  responseRequested
) => async (dispatch, getState) => {
  try {
    const basePath = "http://localhost:3000/api";

    let res = await axios({
      method: "post",
      url: `${basePath}/pullRequest/${prId}/comment/${commentId}/updateCommentExtension`,
      data: {
        type: type.toString(),
        category: category.toString(),
        urgency: parseInt(urgency),
        responseRequested: new Boolean(responseRequested)
      },
      withCredentials: true
    });

    // determine what this data looks like
    let update = {};
    update[commentId] = {
      urgency,
      responseRequested,
      category,
      type
    };

    await dispatch(addCommentExt(update));
  } catch (error) {
    console.error(error);
  }
  return;
};

export const getCommentExt = () => async (dispatch, getState) => {
  try {
    const basePath = "http://localhost:3000/api";
    let response = await axios.get(
      `${basePath}/pullRequest/6/commentExtension`
    );
    await dispatch(addCommentExt(response.data));
  } catch (error) {
    console.error(error);
  }
  return;
};
