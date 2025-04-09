import { getToken } from "./authenticate";

// Helper for making authorized requests
async function fetchWithAuth(url, method = "GET") {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (res.status === 200) return await res.json();
  return [];
}

// Favourites
export function getFavourites() {
  return fetchWithAuth("/favourites");
}

export function addToFavourites(id) {
  return fetchWithAuth(`/favourites/${id}`, "PUT");
}

export function removeFromFavourites(id) {
  return fetchWithAuth(`/favourites/${id}`, "DELETE");
}

// History
export function getHistory() {
  return fetchWithAuth("/history");
}

export function addToHistory(id) {
  return fetchWithAuth(`/history/${id}`, "PUT");
}

export function removeFromHistory(id) {
  return fetchWithAuth(`/history/${id}`, "DELETE");
}
