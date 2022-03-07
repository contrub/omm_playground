import api from "./api";

const getRole = (params) => {
  return api.get('/role', params)
}

const resetPassword = (params) => {
  return api.update(`/reset_password_request/${params.email}`, params) // странный запрос ...
}

const updatePassword = (params) => {
  return api.update(`/reset_password/token?=${params.token}`, params) // странный запрос ...
}

const login = (params) => {
  return api.create("/login", params)
}

const signup = (params) => {
  return api.create("/signup", params)
}

const AuthService = {
  getRole: getRole,
  signup: signup,
  login: login,
  resetPassword: resetPassword,
  updatePassword: updatePassword
}

export default AuthService
