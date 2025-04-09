import jwtDecode from "jwt-decode";

const TOKEN_KEY = "access_token";

// Save JWT to localStorage
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

// Get JWT from localStorage
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// Remove JWT from localStorage
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

// Decode the JWT
export function readToken() {
  try {
    return jwtDecode(getToken());
  } catch (err) {
    return null;
  }
}

// Check if token exists and is valid
export function isAuthenticated() {
  return !!readToken();
}

// Login and get a token
export async function authenticateUser(user, password) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName: user, password }),
  });

  if (res.status === 200) {
    const { token } = await res.json();
    setToken(token);
    return true;
  }

  throw new Error("Authentication failed");
}

// Register a new user
export async function registerUser(user, password, password2) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName: user, password, password2 }),
  });

  if (res.status === 200) return true;

  throw new Error("Registration failed");
}
