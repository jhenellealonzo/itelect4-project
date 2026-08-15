import type { User, Items, Claims } from "../types";

export const student: User = {
  id: 1,
  name: "Jhenelle Kath Olan",
  email: "jhenelle@example.com",
  role: "student",
  isActive: true,
};

export const allItems: Items[] = [
  {
    id: 1,
    name: "Pink Umbrella",
    description: "Left in the Library",
    location: "Library",
    dateLost: new Date(),
    status: "lost",
    ownerId: 1,
  },
  {
    id: 2,
    name: "Blue Water Bottle",
    description: "Found near the Gym",
    location: "Gym",
    dateLost: new Date(),
    status: "found",
    ownerId: 2,
  },
];

export const allClaims: Claims[] = [
  {
    id: 1,
    itemId: 1,
    claimantId: 2,
    claimDate: new Date(),
    status: "approved",
    proof: "Student ID Presented",
  },
  {
    id: 2,
    itemId: 2,
    claimantId: 1,
    claimDate: new Date(),
    status: "rejected",
    proof: "Incorrect item description",
  },
];