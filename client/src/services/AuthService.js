import AuthApi from "./AuthApi";

export default {
  login(email) {
    return AuthApi.create("/login", email)
  },
  logout(token) {
    return AuthApi.get(`/logout/${token}`)
  }
};
