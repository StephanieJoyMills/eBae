// export { getRoles, getRoleData } from "./modules/roles";
// export { getApps } from "./modules/apps";
export { getConfig } from "./reducers/count";
export { getCommentExt, upsertCommentExt } from "./reducers/comments";
export { getExtSchema } from "./reducers/extSchema";
export { authCheck } from "./reducers/auth";

export const reloadExtension = (script) => async (dispatch, getState) => {
  try {
    console.log(chrome);
    chrome.runtime.reload();
  } catch (error) {
    console.error(error);
  }
  return;
};

export const revokeAuth = () => {
  return {
    type: REVOKE_AUTH,
    payload: null
  };
};

export const TEST = "TEST";
export const test = (config) => ({
  type: TEST,
  payload: config
});
