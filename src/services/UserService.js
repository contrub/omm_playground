import api from "./api";

const createUser = (params) => {
  return api.create("/api/users", params);
}

const getUsers = (params) => {
  return api.get("/api/users", params)
}

const getUser = (params) =>  {
  return api.get(`/api/users/${params.email}`, params) // странный запрос ...
}

const updateUser = (params) => {
  return api.update(`/api/users/${params.email}`, params)
}

const deleteUser = (params) => {
  return api.remove(`/api/users/${params.email}`, params);
}

const UserService = {
  getUsers: getUsers,
  getUser: getUser,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser
}

export default UserService
