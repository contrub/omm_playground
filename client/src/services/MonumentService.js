import api from "./api";

const fetchMonuments = (params, tokens) => {
    return api.get("/api/monuments", params, tokens)
}

const createMonument = (params) => {
    return api.create("/api/monuments", params)
}

const deleteMonument = (id) => {
    return api.remove(`/api/monuments/${id}`)
}

const updateMonument = (params) => {
    return api.update(`/api/monuments/${params._id}`, params)
}


const MonumentService = {
  fetchMonuments: fetchMonuments,
  createMonument: createMonument,
  deleteMonument: deleteMonument,
  updateMonument: updateMonument
}

export default MonumentService
