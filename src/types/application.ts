import { Pet } from "./pet";

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string | null;
  dateOfBirth: string;
  createdAt: string;
  verificationToken: string;
  verified: boolean;
}

export interface AdoptionApplication {
  applicationId: string;
  userId: string;
  petId: string;
  reason: string;
  hasPetExperience: string;
  homeType: string;
  hasOtherPets: string;
  status: "PENDING" | "APPROVED" | "REJECTED"; // Extend if needed
  submittedAt: string;
  user: User;
  pet: Pet;
}
