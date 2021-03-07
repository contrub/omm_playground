import api from "./api";

const login = (params) => {
  return api.create("/login", params)
}

const signup = (params) => {
  return api.create("/signup", params)
}

const createUser = (params) => {
  return api.create("/api/users", params);
}

const getUsers = (params) => {
  return api.get("/api/users", params)
}

const getUser = (params) =>  {
  return api.get(`/api/users/${params.email}`, params)
}

const updateUser = (params) => {
  return api.update(`/api/users/${params.email}`, params)
}

const deleteUser = (params) => {
  return api.remove(`/api/users/${params.email}`, params);
}

const getRole = (params) => {
  return api.get('/role', params)
}

const UserService = {
  login: login,
  signup: signup,
  createUser: createUser,
  getUsers: getUsers,
  getUser: getUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  getRole: getRole
}

export default UserService
