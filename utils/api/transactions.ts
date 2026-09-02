import { useQuery } from "@tanstack/react-query"
import axiosInstance from "../axiosInstance"

// GET /admin/transactions?page=1&limit=25&status=COMPLETED
export const useTransactionsQuery = (options: {
  page?: number
  limit?: number
  status?: string
}) => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<IApiResponse<ITransaction[]>>("/admin/transactions", {
        params: {
          page: options.page ?? 1,
          limit: options.limit ?? 25,
          status: options.status,
        },
      })

      return data
    },
  })
}

// GET /admin/transactions/:id
export const useTransactionQuery = (id: string) => {
  return useQuery({
    queryKey: ["transaction", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<IApiResponse<ITransaction>>(`/admin/transactions/${id}`)

      return data
    },
  })
}

// GET /admin/users/:userId/transactions
export const useUserTransactionsQuery = (userId: string, options?: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ["user-transactions", userId, options?.page, options?.limit],
    queryFn: async () => {
      const { data } = await axiosInstance.get<IApiResponse<ITransaction[]>>(
        `/admin/users/${userId}/transactions`,
        {
          params: {
            page: options?.page ?? 1,
            limit: options?.limit ?? 10,
          },
        },
      )

      return data
    },
    enabled: !!userId,
  })
}