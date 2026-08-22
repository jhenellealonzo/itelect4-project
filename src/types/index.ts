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


// ===== UTILITY TYPES =====

// Partial<T> -- every field becomes optional
export type UserUpdate = Partial<User>;

// Pick<T, K> -- keep ONLY the listed fields
export type UserPreview = Pick<User, "id" | "name" | "role">;

// Omit<T, K> -- keep every field EXCEPT the listed ones
export type PublicUser = Omit<User, "email" | "isActive">;

// Record<K, T> -- a fixed set of keys, each mapped to the same value type
export type RoleCount = Record<
  "student" | "securityAdmin",
  number
>;


// ===== ENUMS =====

// Regular enum -- exists at runtime; can be looped over or reverse-mapped
export enum SubmissionStatus {
  Approved,
  Rejected,
}

// const enum -- inlined at compile time, zero runtime overhead
export const enum Role {
  Student = "student",
  SecurityAdmin = "securityAdmin",
}


// ===== TYPE ALIASES =====

// A type alias gives a name to any type -- primitives, unions,
// functions, or objects.

// Alias for a union type (string OR number)
export type ID = number | string;

// Alias for item location
export type Location = {
  building: string;
  room: string;
};

// Alias for formatting dates
export type DateFormatter = (date: Date) => string;


// ===== USING TYPE ALIASES =====

const itemId: ID = "LF-2026-001";

const itemLocation: Location = {
  building: "St. La Salle Building",
  room: "Room 301",
};

const formatDate: DateFormatter = (date) =>
  date.toLocaleDateString();

// Use the variables so TypeScript does not report them as unused
console.log("Item ID:", itemId);
console.log("Item Location:", itemLocation.building, itemLocation.room);
console.log("Formatted Date:", formatDate(new Date()));


// ===== UNION TYPES =====
// One OR the other

export type StringOrNumber = string | number;

export type Status = "lost" | "found" | "claimed";

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

// Use lostItem so TypeScript does not report it as unused
console.log("Lost Item:", lostItem.name);
console.log("Owner:", lostItem.owner.name);
console.log("Claim Count:", lostItem.claimCount);


// ===== GENERIC INTERFACE =====

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}


// ===== GT3 API TYPES =====
// JSON cannot represent JavaScript Date objects.
// json-server also returns IDs as strings.
// These API types are derived from the main application types
// so Items and Claims remain the single source of truth.

// API response for an Item
export type ApiItem = Omit<Items, "id" | "dateLost"> & {
  id: string;
  dateLost: string;
};

// Data sent when creating a new Item.
// The server creates the ID.
export type NewItem = Omit<ApiItem, "id">;

// API response for a Claim
export type ApiClaim = Omit<Claims, "id" | "claimDate"> & {
  id: string;
  claimDate: string;
};

// Data sent when creating a new Claim.
// The server creates the ID.
export type NewClaim = Omit<ApiClaim, "id">;