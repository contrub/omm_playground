import api from "./api";

export default {
  fetchMonuments(params) {
    return api.get("/monuments", params);
  },
  createMonument(params) {
    return api.create("/monuments", params);
  },
  deleteMonument(id) {
    return api.remove(`/monuments/${id}`);
  },
  updateMonument(params) {
    return api.update(`/monuments/${params._id}`, params)
  }
};
