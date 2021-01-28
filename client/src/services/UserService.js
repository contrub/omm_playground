import api from "./api";

export default {
  login(params) {
    return api.create(`/login`, params)
  },
  createUser(params) {
    return api.create("/users", params);
  },
  getUsers() {
    return api.get("/users")
  },
  getUser(params) {
    return api.get(`/users/${params.email}`, params)
  },
  updateUser(params) {
    return api.update(`/users/${params.email}`, params)
  },
  deleteUser(email) {
    return api.remove(`/users/${email}`);
  }
};
