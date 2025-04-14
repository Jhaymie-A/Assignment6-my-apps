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
  const res = await fetch(`${API}/favourites`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `jwt ${getToken()}`
    },
    body: JSON.stringify({ id }) // sending ID in body
  });

  if (res.status === 200) return await res.json();
  return [];
}


export async function removeFromFavourites(id) {
  const res = await fetch(`${API}/favourites`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `jwt ${getToken()}`
    },
    body: JSON.stringify({ id }) // send in body
  });

  if (res.status === 200) return await res.json();
  return [];
}


// HISTORY
export async function getHistory() {
  return authFetch(`${API}/history`);
}

export async function addToHistory(queryString) {
  const res = await fetch(`${API}/history`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `jwt ${getToken()}`
    },
    body: JSON.stringify({ id: queryString })  // sends ID in body
  });

  if (res.status === 200) return await res.json();
  return [];
}


export async function removeFromHistory(id) {
  const res = await fetch(`${API}/history`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `jwt ${getToken()}`
    },
    body: JSON.stringify({ id })
  });

  if (res.status === 200) return await res.json();
  return [];
}
