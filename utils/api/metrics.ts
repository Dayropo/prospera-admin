import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

// GET /admin/metrics
export const useMetricsQuery = () => {
  return useQuery({
    queryKey: ["metrics"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<IApiResponse<IMetrics>>("/admin/metrics")
      
      return data
    },
  })
}