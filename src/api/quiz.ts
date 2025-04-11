import { axios } from "@/lib";
import {
  AnswerPetMappingResponse,
  QuizAnswer,
  QuizQuestion,
} from "@/types/quiz";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Fetch all quiz
export const useGetAllQuiz = (page?: number, pageSize?: number) => {
  return useQuery({
    queryKey: ["get-all-quiz", { page, pageSize }],
    queryFn: async () => {
      const { data } = await axios.get<QuizQuestion[]>("/quiz", {
        params: { page, pageSize },
      });
      return data;
    },
  });
};

// Fetch quiz by ID
export const useGetQuizById = (id: string) => {
  return useQuery({
    queryKey: ["get-quiz", id],
    queryFn: async () => {
      const { data } = await axios.get<QuizQuestion>(`/quiz/${id}`);
      return data;
    },
    enabled: !!id, // Prevents execution if id is undefined
  });
};

interface AnswerIdRequest {
  answerIds: string[];
}

export const usePetsByAnswerId = () => {
  return useMutation({
    mutationFn: async (answerIds: AnswerIdRequest) => {
      const { data } = await axios.post<AnswerPetMappingResponse[]>(
        "/quiz-answers/pets-by-answers",
        answerIds
      );
      return data;
    },
  });
};

interface Quiz {
  questionText: string;
}

export const useCreateQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (answerIds: Quiz) => {
      const { data } = await axios.post("/quiz", answerIds);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-quiz"] });
    },
  });
};

export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/quiz/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-quiz"] });
    },
  });
};

export const useUpdateQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      questionText,
    }: {
      id: string;
      questionText: string;
    }) => {
      const { data } = await axios.put(`/quiz/${id}`, { questionText });
      return data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["get-all-quiz"] });
      queryClient.invalidateQueries({ queryKey: ["get-quiz", id] });
    },
  });
};

interface QuizAnswers {
  questionId: string;
  answerText: string;
}

export const useCreateAnswer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (answerIds: QuizAnswers) => {
      const { data } = await axios.post("/quiz-answers", answerIds);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-quiz"] });
    },
  });
};

export const useDeleteAnswer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/quiz-answers/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-answer"] });
    },
  });
};

export const useUpdateAnswer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      answerText,
    }: {
      id: string;
      answerText: string;
    }) => {
      const { data } = await axios.put(`/quiz-answers/${id}`, { answerText });
      return data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["get-all-quiz"] });
      queryClient.invalidateQueries({ queryKey: ["get-answer", id] });
    },
  });
};

export const useGetAnswerById = (id: string) => {
  return useQuery({
    queryKey: ["get-answer", id],
    queryFn: async () => {
      const { data } = await axios.get<QuizAnswer>(`/quiz-answers/${id}`);
      return data;
    },
    enabled: !!id, // Prevents execution if id is undefined
  });
};

export const useAttachPet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, petId }: { id: string; petId: string }) => {
      const { data } = await axios.post(`/quiz-answers/${id}/attach-pet`, {
        id,
        petId,
      });
      return data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["get-all-quiz"] });
      queryClient.invalidateQueries({ queryKey: ["get-answer", id] });
    },
  });
};
