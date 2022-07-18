import { authApiPostClient } from './axios-config'
export default {
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
  verifyToken(data) {
    return authApiPostClient.post(
      `${process.env.APIURL}/sessions/verify_auth_token`,
      data
    )
  },
}
