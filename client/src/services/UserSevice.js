import api from "./api";

export default {
  createUser(params) {
    return api.create("/users", params);
  },
  getUsers() {
    return api.get("/users")
  },
  getUser(email) {
    return api.get(`/users/${email}`)
  },
  updateUser(params) {
    return api.update(`/users/${params.email}`, params)
  },
  deleteUser(email) {
    return api.remove(`/users/${email}`);
  }
};
