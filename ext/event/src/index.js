import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers";
import { loadState, saveState } from "./localStorage";
import { alias, wrapStore } from "webext-redux";

// import api from "../api";

// change to const
let persistedState = loadState();

// const store = createStore(
//   rootReducer,
//   applyMiddleware(thunk.withExtraArgument(persistedState))
// );
const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
  let state = store.getState();
  saveState({
    // auth: state.auth
  });
});

wrapStore(store);
