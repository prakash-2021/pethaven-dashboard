import { axios } from "@/lib";
import { useQuery } from "@tanstack/react-query";

export type DashboardStats = {
  message: string;
  data: {
    totalUsers: number;
    totalPets: number;
    totalAdoptedPets: number;
    totalStories: number;
    totalStrayDogReports: number;
    weeklyAdoptedPets: number;
    monthlyAdoptedPets: number;
    weeklyStrayDogReports: number;
    monthlyStrayDogReports: number;
  };
};

export const useGetDashboard = () => {
  return useQuery({
    queryKey: ["get-dashboard"],
    queryFn: async () => {
      const { data } = await axios.get<{ data: DashboardStats }>("/dashboard");
      return data.data;
    },
  });
};
