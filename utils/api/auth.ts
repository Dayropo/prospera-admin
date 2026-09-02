import { useMutation } from "@tanstack/react-query"
import axiosInstance from "../axiosInstance"

// POST /login
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (params: { email: string; password: string }) => {
      const { data } = await axiosInstance.post("/login", params)
      return data
    },
  })
}

// POST /verify-2fa
export const useVerifyTwoFactorLoginMutation = () => {
  return useMutation({
    mutationFn: async (params: { token: string; tempAuthToken: string }) => {
      const { data } = await axiosInstance.post("/verify-2fa", params)
      return data
    },
  })
}
