// ===== INTERFACES =====
// An interface defines the SHAPE of an object -- what fields it must have.
export interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "securityAdmin";
  isActive: boolean;
}
export interface Items {
  id: number;
  name: string;
  description: string;
  location: string;
  dateLost: Date;
  status: "lost" | "found" | "claimed";
  ownerId: number;
}
  
export interface Claims {
  id: number;
  itemId: number;
  claimantId: number;
  claimDate: Date;
  status: "approved" | "rejected";
  proof: string;
}


//===== UTILITY TYPES =====
// Partial<T> -- every field becomes optional
export type UserUpdate = Partial<User>;
// Pick<T, K> -- keep ONLY the listed fields
export type UserPreview = Pick<User, "id" | "name" | "role">;
// Omit<T, K> -- keep every field EXCEPT the listed ones
export type PublicUser = Omit<User, "email" | "isActive">;
// Record<K, T> -- a fixed set of keys, each mapped to the same value type
export type RoleCount = Record<"student" | "securityAdmin", number>;


// ===== ENUMS =====
// Regular enum -- exists at runtime; can be looped over or reverse-mapped
export enum SubmissionStatus {
  Approved,
  Rejected
}
// const enum -- inlined at compile time, zero runtime overhead
export const enum Role {
  Student = "student",
  SecurityAdmin = "securityAdmin",
}


// ===== TYPE ALIASES =====
// A type alias gives a name to any type -- primitives, unions, functions, objects
// Alias for a union type (string OR number)
export type ID = number | string;
// Alias for an object shape
// Alias for item location
export type Location = {
  building: string;
  room: string;
};
    
// Alias for formatting dates
export type DateFormatter = (date: Date) => string;
// Using them
const itemId: ID = "LF-2026-001";
const itemLocation: Location = {
  building: "St. La Salle Building",
  room: "Room 301",
};
const formatDate: DateFormatter = (date) =>
  date.toLocaleDateString();

console.log(itemId);
console.log(formatDate(new Date()));


// ===== UNION TYPES -- One OR the other =====
export type StringOrNumber = string | number;
export type Status = "lost" | "found" | "claimed"; // literal union
// Function that accepts a union type
export function printId(id: StringOrNumber): void {
  console.log(`ID: ${id}`);
}
printId(101);
printId("LF-2026-001");


// ===== INTERSECTION TYPES =====

export type ItemWithOwner = Items & {
  owner: User;
  claimCount: number;
};

const lostItem: ItemWithOwner = {
  id: 1,
  name: "Black Wallet",
  description: "Contains school ID and cards",
  location: "Library",
  dateLost: new Date(),
  status: "lost",
  ownerId: 1,

  owner: {
    id: 1,
    name: "Juan Dela Cruz",
    email: "juan@school.edu",
    role: "student",
    isActive: true,
  },

  claimCount: 2,
};

// ===== GENERIC INTERFACE =====

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}