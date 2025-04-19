import { axios } from "@/lib";
import { AdoptionApplication } from "@/types/application";
import { Pet } from "@/types/pet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Fetch all pets
export const useGetAllApplication = () => {
  return useQuery({
    queryKey: ["get-all-application"],
    queryFn: async () => {
      const { data } = await axios.get<AdoptionApplication[]>("/applications");
      return data;
    },
  });
};

// Update pet
export const useUpdateApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      updatedApplication,
    }: {
      id: string;
      updatedApplication: Partial<AdoptionApplication>;
    }) => {
      const { data } = await axios.put<Pet>(
        `/applications/${id}`,
        updatedApplication
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-application"] });
    },
  });
};
