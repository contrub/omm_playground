import api from "./api";

const fetchMonuments = () => {
    return api.get("/api/monuments")
}

const getMonument = (params) => {
  return api.get(`/api/monuments/${params._id}`, params)
}

const createMonument = (params) => {
    return api.create("/api/monuments", params)
}

const deleteMonument = (params) => {
    return api.remove(`/api/monuments/${params._id}`, params)
}

const updateMonument = (params) => {
    return api.update(`/api/monuments/${params._id}`, params)
}


const MonumentService = {
  fetchMonuments: fetchMonuments,
  getMonument: getMonument,
  createMonument: createMonument,
  deleteMonument: deleteMonument,
  updateMonument: updateMonument
}

export default MonumentService
