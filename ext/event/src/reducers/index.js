import { combineReducers } from "redux";

import count from "./count";
import comments from "./comments";
import extSchema from "./extSchema";
import auth from "./auth";
// const persistedState = loadState();

export default combineReducers({
  count,
  comments,
  extSchema,
  auth
  // actions
});
