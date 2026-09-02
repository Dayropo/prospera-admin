import { useMutation, useQuery } from "@tanstack/react-query"
import axiosInstance from "../axiosInstance"

// GET /admin/users?page=1&limit=20
export const useUsersQuery = (options: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<IApiResponse<IUser[]>>("/admin/users", {
        params: {
          page: options.page ?? 1,
          limit: options.limit ?? 20,
        },
      })

      return data
    },
  })
}

// GET /admin/users/:id
export const useUserQuery = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<IApiResponse<IUser>>(`/admin/users/${id}`)

      return data
    },
  })
}

// PATCH /admin/users/:id
export const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: async (payload: { id: string; data: Partial<IUser> }) => {
      const { data } = await axiosInstance.patch<IApiResponse<IUser>>(
        `/admin/users/${payload.id}`,
        payload.data,
      )

      return data
    },
  })
}
