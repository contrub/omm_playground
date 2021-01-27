import api from "./api";

export default {
  login(params) {
    return api.create(`/login`, params)
  },
  createUser(params) {
    return api.create("/post/users", params);
  },
  getUsers() {
    return api.get("/get/users")
  },
  getUser(params) {
    return api.get(`/get/users/${params.email}`, params)
  },
  updateUser(params) {
    return api.update(`/put/users/${params.email}`, params)
  },
  deleteUser(email) {
    return api.remove(`/delete/users/${email}`);
  }
};
