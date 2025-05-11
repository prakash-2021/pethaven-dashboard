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
    mutationFn: async ({ id, petId }: { id: string; petId: string[] }) => {
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

// const quizQuestions = [
//   {
//     question: "What is your ideal pet's activity level?",
//     options: [
//       "Very active, loves to run and play outside.",
//       "Moderately active, enjoys walks and short play sessions.",
//       "Relaxed, prefers lounging and short walks.",
//       "Low energy, enjoys sitting by your side or on your lap.",
//     ],
//   },
//   {
//     question: "How much time can you dedicate to grooming your pet?",
//     options: [
//       "I enjoy grooming and can do it regularly.",
//       "I don't mind grooming a little bit.",
//       "I would prefer a low-maintenance pet with minimal grooming needs.",
//       "I prefer pets that don’t require any grooming.",
//     ],
//   },
//   {
//     question: "How much space do you have for your pet?",
//     options: [
//       "I have a large house with a yard.",
//       "I live in an apartment with some outdoor space nearby.",
//       "I live in an apartment and don’t have much outdoor space.",
//       "I have a small space but love to take my pet outside regularly.",
//     ],
//   },
//   {
//     question: "How would you describe your ideal pet's personality?",
//     options: [
//       "Friendly, playful, and loves everyone.",
//       "Calm, affectionate, and enjoys cuddles.",
//       "Independent, but enjoys occasional attention.",
//       "Protective, loyal, and always by my side.",
//     ],
//   },
//   {
//     question: "Do you prefer a dog or a cat as a pet?",
//     options: [
//       "I prefer a dog—someone who loves adventure and outdoor activities.",
//       "I prefer a cat—independent and easygoing.",
//       "I like both, depending on personality and energy levels.",
//       "I have no preference.",
//     ],
//   },
//   {
//     question: "How do you feel about pets that bark or meow loudly?",
//     options: [
//       "I don’t mind some noise—it adds personality.",
//       "I’d prefer a quieter pet.",
//       "I need a pet that is almost silent.",
//       "I enjoy interacting with vocal pets.",
//     ],
//   },
//   {
//     question: "Are you looking for a pet with specific training needs?",
//     options: [
//       "Yes, I want a pet that I can train easily.",
//       "I’m okay with a pet that needs some training but can manage.",
//       "I’d prefer a pet that doesn’t require much training.",
//       "I want a pet that already knows basic commands and is easy to handle.",
//     ],
//   },
//   {
//     question: "How do you feel about shedding?",
//     options: [
//       "I don’t mind shedding—regular cleaning is okay.",
//       "I prefer a pet that sheds less.",
//       "I prefer no shedding at all.",
//       "I love pets with thick, fluffy coats, shedding included!",
//     ],
//   },
// ];
