import api from "./api";

export default {
  fetchMonuments(params, tokens) {
    return api.get("/get/monuments", params, tokens);
  },
  createMonument(params) {
    return api.create("/post/monuments", params);
  },
  deleteMonument(id) {
    return api.remove(`/delete/monuments/${id}`);
  },
  updateMonument(params) {
    return api.update(`/put/monuments/${params._id}`, params)
  }
};
