import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "access_token";

// Save token to localStorage
export function setToken(token) {
  console.log("Setting token in localStorage:", token); // Debug log
  localStorage.setItem(TOKEN_KEY, token);
}

// Get token from localStorage
export function getToken() {
  const token = localStorage.getItem(TOKEN_KEY);
  console.log("getToken() returned:", token); // Debug log
  return token;
}

// Remove token from localStorage
export function removeToken() {
  console.log("🗑 Removing token from localStorage");
  localStorage.removeItem(TOKEN_KEY);
}

// Decode JWT token
export function readToken() {
  try {
    const token = getToken();
    return token ? jwtDecode(token) : null;
  } catch (err) {
    console.warn("Failed to decode token:", err.message);
    return null;
  }
}

// Check if user is authenticated
export function isAuthenticated() {
  return readToken() !== null;
}

// Login user
export async function authenticateUser(user, password) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    body: JSON.stringify({ userName: user, password }),
    headers: { "Content-Type": "application/json" }
  });

  const data = await res.json();

  if (res.status === 200) {
    console.log("Login response:", data); // Debug log
    setToken(data.token);
    return true;
  } else {
    console.error("Login failed:", data.message);
    throw new Error(data.message);
  }
}

// Register user (returns true if success, throws if failed)
export async function registerUser(user, password, password2) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: "POST",
    body: JSON.stringify({ userName: user, password, password2 }),
    headers: { "Content-Type": "application/json" }
  });

  const data = await res.json();

  if (res.status === 200) {
    console.log("Registration successful");
    return true; // Success, but do not auto-login
  } else {
    console.error("Registration failed:", data.message);
    throw new Error(data.message);
  }
}
