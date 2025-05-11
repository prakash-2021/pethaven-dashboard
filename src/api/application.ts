import { axios } from "@/lib";
import { AdoptionApplication } from "@/types/application";
import { Pet } from "@/types/pet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Fetch all Applications
export const useGetAllApplication = () => {
  return useQuery({
    queryKey: ["get-all-application"],
    queryFn: async () => {
      const { data } = await axios.get<AdoptionApplication[]>("/applications");
      return data;
    },
  });
};

// Update Application
export const useUpdateApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
      email,
      petName,
    }: {
      id: string;
      status: string;
      petName: string;
      email: string;
    }) => {
      const { data } = await axios.put<Pet>(`/applications/${id}/status`, {
        status,
        petName,
        email,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-application"] });
    },
  });
};
