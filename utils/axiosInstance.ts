import axios from "axios"
import { generateSignature } from "./apiSignature"
import { getAuthToken } from "./authUtils"
import { logoutUser } from "./logoutUtils"

const API_SECRET = process.env.NEXT_PUBLIC_API_SECRET!

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.request.use(async config => {
  if (!API_SECRET) throw new Error("API secret missing")

  // Use relative URL for signature payload (path only, no query params)
  const url = config.url?.startsWith("http") ? new URL(config.url).pathname : config.url || ""

  const method = (config.method || "get").toUpperCase()
  const { signature, timestamp } = await generateSignature(method, url, API_SECRET)

  config.headers["x-api-signature"] = signature
  config.headers["x-api-timestamp"] = timestamp

  // Add auth token if available
  const token = getAuthToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// Response interceptor to handle session expiration
axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // Check if the error response contains session expired message
    if (
      error.response?.data?.success === false &&
      error.response?.data?.message === "Session expired. Please login again."
    ) {
      // If we're in the browser environment
      if (typeof window !== "undefined") {
        // Use the standalone logout utility function
        logoutUser("Your session has expired. Please login again.")
      }
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
