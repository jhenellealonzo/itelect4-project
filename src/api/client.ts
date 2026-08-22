// src/api/client.ts

// Every call to json-server lives in this file.
// Components should NOT call fetch() directly.

import type {
  ApiItem,
  ApiClaim,
  NewClaim,
} from "../types/index";

export const API_URL = "http://localhost:3001";

// ============================================================
// ITEMS
// ============================================================

// GET /items
// Gets all lost and found items.
export async function fetchItems(): Promise<ApiItem[]> {
  const res = await fetch(`${API_URL}/items`);

  if (!res.ok) {
    throw new Error("Could not load items");
  }

  return res.json();
}


// GET /items/:id
// Gets one item using its ID.
export async function fetchItemById(
  id: string
): Promise<ApiItem> {
  const res = await fetch(`${API_URL}/items/${id}`);

  if (!res.ok) {
    throw new Error("Could not load that item");
  }

  return res.json();
}


// ============================================================
// CLAIMS
// ============================================================

// GET /claims
// Gets all claims.
export async function fetchClaims(): Promise<ApiClaim[]> {
  const res = await fetch(`${API_URL}/claims`);

  if (!res.ok) {
    throw new Error("Could not load claims");
  }

  return res.json();
}


// POST /claims
// Creates a new claim.
// json-server generates the ID.
export async function createClaim(
  newClaim: NewClaim
): Promise<ApiClaim> {
  const res = await fetch(`${API_URL}/claims`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newClaim),
  });

  if (!res.ok) {
    throw new Error("Could not save the claim");
  }

  return res.json();
}