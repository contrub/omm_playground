import api from "./api";

export default {
  getUsers() {
    return api.get("/users");
  },
  getUser(email) {
    return api.get(`/users/${email}`)
  },
  createUser(params) {
    return api.create("/users", params);
  },
  deleteUser(email) {
    return api.remove(`/users/${email}`);
  },
  updateUser(params) {
    return api.update(`/users/${params.email}`, params)
  }
};
