import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"

const TOKEN_KEY = "prospera-auth-token"
const TOKEN_EXPIRY_DAYS = 7

type JwtPayload = {
  userId: string
  email: string
  userType: string
  iat: number
  exp: number
}

/**
 * Sets the authentication token in an HTTP-only cookie
 */
export const setAuthToken = (token: string): void => {
  // Store in a cookie that expires in 7 days
  Cookies.set(TOKEN_KEY, token, {
    expires: TOKEN_EXPIRY_DAYS,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  })
}

/**
 * Gets the authentication token from cookies
 */
export const getAuthToken = (): string | undefined => {
  return Cookies.get(TOKEN_KEY)
}

/**
 * Removes the authentication token
 */
export const removeAuthToken = (): void => {
  Cookies.remove(TOKEN_KEY)
}

/**
 * Checks if the user is authenticated by verifying token existence
 */
export const isAuthenticated = (): boolean => {
  const token = getAuthToken()
  if (!token) return false

  try {
    const decoded = jwtDecode<JwtPayload>(token)
    const currentTime = Date.now() / 1000

    // Check if token is expired
    return decoded.exp > currentTime
  } catch (error) {
    removeAuthToken()
    return false
  }
}

/**
 * Gets the decoded JWT payload if authenticated
 */
export const getDecodedToken = (): JwtPayload | null => {
  const token = getAuthToken()
  if (!token) return null

  try {
    return jwtDecode<JwtPayload>(token)
  } catch (error) {
    return null
  }
}
