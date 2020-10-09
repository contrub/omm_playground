import api from "./api";

export default {
  getUsers() {
    return api.get("/users");
  },
  createUser(params) {
    return api.create("/users", params);
  },
  deleteUser(id) {
    return api.remove(`/users/${id}`);
  },
  updateUser(params) {
    return api.update(`/users/${params._id}`, params)
  }
};
