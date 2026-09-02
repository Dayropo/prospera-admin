import { useQuery } from "@tanstack/react-query"
import axiosInstance from "../axiosInstance"

// GET /admin/logs
export const useLogsQuery = () => {
  return useQuery({
    queryKey: ["logs"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<IApiResponse<ILog[]>>("/admin/logs")

      return data
    },
  })
}

// GET /admin/logs/:id
export const useLogQuery = (id: string) => {
  return useQuery({
    queryKey: ["log", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<IApiResponse<ILog>>(`/admin/logs/${id}`)

      return data
    },
  })
}

// GET /admin/users/:userId/logs
export const useUserLogsQuery = (userId: string) => {
  return useQuery({
    queryKey: ["user-logs", userId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<IApiResponse<ILog[]>>(`/admin/users/${userId}/logs`)

      return data
    },
  })
}
