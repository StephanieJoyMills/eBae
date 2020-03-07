const axios = require("axios");

// const basePath = process.env.REACT_APP_BASE_PATH;
const basePath = "http://localhost:3000/api";

export default {
  getConfig: async () => {
    return axios.get(`${basePath}/config`);
  },
  getApps: async () => {
    return axios.get(`${basePath}/user/apps`);
  },
  getRoles: async (appId) => {
    return axios.get(`${basePath}/app/${appId}/roles `);
  },
  getRolePermissions: async (id) => {
    return axios.get(`${basePath}/role/${id}/permissions`);
  },
  getRoleProjects: async (id) => {
    return axios.get(`${basePath}/role/${id}/projects`);
  },
  getRoleGroups: async (id) => {
    return axios.get(`${basePath}/role/${id}/groups`);
  },
  getRoleUsers: async (id) => {
    return axios.get(`${basePath}/role/${id}/users`);
  }
};
