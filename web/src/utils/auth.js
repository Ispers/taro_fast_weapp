import Cookies from 'js-cookie'

export function getToken() {
  return Cookies.get(TOKEN_KEY)
}

export function setToken(token, rememberMe) {
  if (rememberMe) {
    return Cookies.set(TOKEN_KEY, token, { expires: TOKEN_COOKIE_EXPIRES })
  } else return Cookies.set(TOKEN_KEY, token)
}

export function removeToken() {
  return Cookies.remove(TOKEN_KEY)
}
