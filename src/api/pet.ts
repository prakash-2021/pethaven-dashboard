import { axios } from "@/lib";
import { Pet, Pets } from "@/types/pet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Fetch all pets
export const useGetAllPets = (
  page?: number,
  pageSize?: number,
  search?: string
) => {
  return useQuery({
    queryKey: ["get-all-pets", { page, pageSize, search }],
    queryFn: async () => {
      const { data } = await axios.get<Pets>("/pet", {
        params: { page, pageSize, search },
      });
      return data;
    },
  });
};

// Fetch pet by ID
export const useGetPetById = (id: string) => {
  return useQuery({
    queryKey: ["get-pet", id],
    queryFn: async () => {
      const { data } = await axios.get<Pet>(`/pet/${id}`);
      return data;
    },
    enabled: !!id, // Prevents execution if id is undefined
  });
};

// Create pet
export const useCreatePet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newPet: Pet) => {
      const { data } = await axios.post<Pet>("/pet", newPet);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-pets"] });
    },
  });
};

// Update pet
export const useUpdatePet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      updatedPet,
    }: {
      id: string;
      updatedPet: Partial<Pet>;
    }) => {
      const { data } = await axios.put<Pet>(`/pet/${id}`, updatedPet);
      return data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["get-all-pets"] });
      queryClient.invalidateQueries({ queryKey: ["get-pet", id] });
    },
  });
};

// Delete pet
export const useDeletePet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/pet/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-pets"] });
    },
  });
};

export type UploadedImage = {
  secure_url: string;
  created_at: string;
};

export const useUploadImage = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await axios.post("/pet/uploads", formData);
      return data.data; // assuming responseGenerator wraps the result
    },
  });
};
