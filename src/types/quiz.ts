import { Pet } from "./pet";

export interface QuizAnswer {
  answerId: string;
  questionId: string;
  answerText: string;
  createdAt: string; // or `Date` if you're parsing it to a Date object
}

export interface QuizQuestion {
  questionId: string;
  questionText: string;
  createdAt: string; // or `Date`
  answers: QuizAnswer[];
}

export interface AnswerPetMappingResponse {
  answerId: string;
  pets: Pet[];
}
