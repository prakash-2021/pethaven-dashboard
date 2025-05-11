// src/api/story.ts

import { axios } from "@/lib";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Story = {
  id: string;
  title: string;
  thumbnail: string;
  shortDescription: string;
  content: string;
  category: string;
  status: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
};

// Fetch all stories
export const useGetAllStories = () => {
  return useQuery({
    queryKey: ["get-all-stories"],
    queryFn: async () => {
      const { data } = await axios.get<{ data: { stories: Story[] } }>(
        "/story"
      );
      return data.data;
    },
  });
};

// Update story status
export const useUpdateStoryStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      storyId,
      status,
    }: {
      storyId: string;
      status: string;
    }) => {
      const { data } = await axios.put(`/story/${storyId}`, {
        status,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-stories"] });
    },
  });
};
