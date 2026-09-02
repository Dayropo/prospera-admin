import { toast } from "sonner"
import { removeAuthToken } from "./authUtils"
import { useUserStore } from "@/store/userStore"

/**
 * Standalone logout utility function that can be used outside of React components
 * @param message Optional message to display in the toast
 */
export const logoutUser = (message?: string) => {
  // Clear auth token
  removeAuthToken()
  
  // Clear user data from store
  useUserStore.getState().clearUser()
  
  // Show toast notification if message is provided
  if (message) {
    toast.error(message)
  }
  
  // Redirect to login page
  window.location.href = '/login'
}
