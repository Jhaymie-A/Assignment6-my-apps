import { getToken } from "./authenticate";

const API = process.env.NEXT_PUBLIC_API_URL;

// Internal helper function
async function authFetch(url, method = "GET") {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `jwt ${getToken()}`
    }
  });

  if (res.status === 200) return await res.json();
  return [];
}

// FAVOURITES
export async function getFavourites() {
  return authFetch(`${API}/favourites`);
}

export async function addToFavourites(id) {
  return authFetch(`${API}/favourites/${id}`, "PUT");
}

export async function removeFromFavourites(id) {
  return authFetch(`${API}/favourites/${id}`, "DELETE");
}

// HISTORY
export async function getHistory() {
  return authFetch(`${API}/history`);
}

export async function addToHistory(id) {
  return authFetch(`${API}/history/${encodeURIComponent(id)}`, "PUT");  
}

export async function removeFromHistory(id) {
  return authFetch(`${API}/history/${encodeURIComponent(id)}`, "DELETE");  
}