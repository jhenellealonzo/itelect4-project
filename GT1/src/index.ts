// ===== IMPORTS =====
import type {
  User,
  Items,
  Claims,
  ApiResponse,
  StringOrNumber,
  UserUpdate,
  UserPreview,
  PublicUser,
  RoleCount,
} from "../types/index";

import { SubmissionStatus, Role } from "../types/index";


// ===== PRIMITIVE TYPE ANNOTATIONS =====

// Variables with explicit types
const projectName: string = "Campus Lost & Found Tracker";
const currentYear: number = 2026;
const isWebApp: boolean = true;
const nothing: null = null;
const notSet: undefined = undefined;

// Function: typed parameters + typed return value
function greet(name: string, year: number): string {
  return `Welcome to ${name} - AY ${year}!`;
}

// void: function that does NOT return a value
function logMessage(message: string): void {
  console.log(message);
}

logMessage(greet(projectName, currentYear));


// ===== USING INTERFACES =====

const student: User = {
  id: 1,
  name: "Juan Dela Cruz",
  email: "juan@example.com",
  role: "student",
  isActive: true,
};

const item: Items = {
  id: 1,
  name: "Black Wallet",
  description: "Contains school ID and cards",
  location: "Library",
  dateLost: new Date(),
  status: "lost",
  ownerId: 1,
};

const claim: Claims = {
  id: 1,
  itemId: 1,
  claimantId: 2,
  claimDate: new Date(),
  status: "approved",
  proof: "Student ID presented",
};

console.log(student);
console.log(item);
console.log(claim);


// ===== TYPE NARROWING =====

// Narrowing with typeof
function processInput(input: StringOrNumber): string {
  if (typeof input === "string") {
    return input.toUpperCase();
  }

  return input.toFixed(2);
}

// Narrowing with instanceof
function formatDate(value: string | Date): string {
  if (value instanceof Date) {
    return value.toLocaleDateString();
  }

  return value;
}

console.log(processInput("wallet"));
console.log(processInput(101));
console.log(formatDate(new Date()));


// ===== GENERIC FUNCTIONS =====

function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

function getById<T extends { id: number }>(
  items: T[],
  id: number,
): T | undefined {
  return items.find((item) => item.id === id);
}

const firstUser = getFirst<User>([student]);
const foundItem = getById<Items>([item], 1);

console.log(firstUser?.name);
console.log(foundItem?.name);


// ===== GENERIC INTERFACE =====

const userResponse: ApiResponse<User> = {
  success: true,
  data: student,
};

const itemResponse: ApiResponse<Items[]> = {
  success: true,
  data: [item],
};

console.log(userResponse.data.name);
console.log(itemResponse.data[0]?.name);


// ===== USING UTILITY TYPES =====

// Partial<T>
const patch: UserUpdate = {
  name: "Juan D. Cruz",
};

// Pick<T, K>
const preview: UserPreview = {
  id: 1,
  name: "Juan Dela Cruz",
  role: "student",
};

// Omit<T, K>
const publicProfile: PublicUser = {
  id: 1,
  name: "Juan Dela Cruz",
  role: "student",
};

// Record<K, T>
const roleCount: RoleCount = {
  student: 150,
  securityAdmin: 5,
};


// ===== ReturnType<T> =====

function createClaim(itemId: number) {
  return {
    id: 1,
    itemId,
    claimantId: 2,
    claimDate: new Date(),
    status: "approved" as const,
    proof: "Student ID presented",
  };
}

type NewClaim = ReturnType<typeof createClaim>;

const newClaim: NewClaim = createClaim(1);

console.log(newClaim);


// ===== USING ENUMS =====

let status: SubmissionStatus = SubmissionStatus.Approved;

console.log(SubmissionStatus[status]);

status = SubmissionStatus.Rejected;

console.log(status === SubmissionStatus.Rejected);

const currentRole: Role = Role.SecurityAdmin;

console.log(currentRole); // "securityAdmin"