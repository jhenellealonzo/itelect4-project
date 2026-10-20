import type {
  ApiClaim,
  AiItemReportReview,
  ApiItem,
  AuthReply,
  NewClaim,
} from "../types";
import useAuthStore from "../store/authStore";

export const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error(
    "VITE_API_URL is missing. Copy .env.example to .env, fill it in, and restart npm run dev.",
  );
}

export async function request<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const token = useAuthStore.getState().token;
  const headers = new Headers(init.headers);

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers,
  });

  let body: unknown = null;
  try {
    body = await response.json();
  } catch {
    // Some error responses have no JSON body.
  }

  if (!response.ok) {
    const message =
      typeof body === "object" &&
      body !== null &&
      "message" in body &&
      typeof body.message === "string"
        ? body.message
        : `Request failed (${response.status})`;

    throw new Error(message);
  }

  return body as T;
}

export function fetchItems(): Promise<ApiItem[]> {
  return request<ApiItem[]>("/api/items");
}

export function fetchItemById(id: string): Promise<ApiItem> {
  return request<ApiItem>(`/api/items/${id}`);
}

export function fetchClaims(): Promise<ApiClaim[]> {
  return request<ApiClaim[]>("/api/claims");
}

export function createClaim(newClaim: NewClaim): Promise<ApiClaim> {
  return request<ApiClaim>("/api/claims", {
    method: "POST",
    body: JSON.stringify(newClaim),
  });
}

export function registerUser(values: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthReply["user"]> {
  return request<AuthReply["user"]>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(values),
  });
}

export function loginUser(values: {
  email: string;
  password: string;
}): Promise<AuthReply> {
  return request<AuthReply>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(values),
  });
}

export function askAi(prompt: string): Promise<AiItemReportReview> {
  return request<AiItemReportReview>("/api/ai", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });
}
