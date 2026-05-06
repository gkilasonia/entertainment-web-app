const API_BASE_URL = "http://localhost:5000/api/auth";

/**
 * Register a new user
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} passwordConfirm - Password confirmation
 * @returns {Promise<Object>} Response with token and user data
 */
export const registerUser = async (email, password, passwordConfirm) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, passwordConfirm }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
};

/**
 * Login an existing user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} Response with token and user data
 */
export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

/**
 * Save authentication data to localStorage
 * @param {Object} authData - Authentication data containing token and user info
 */
export const saveAuthData = (authData) => {
  localStorage.setItem("token", authData.token);
  localStorage.setItem("user", JSON.stringify(authData.user));
};

/**
 * Get authentication data from localStorage
 * @returns {Object|null} Authentication data or null if not found
 */
export const getAuthData = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token && user) {
    return {
      token,
      user: JSON.parse(user),
    };
  }

  return null;
};

/**
 * Clear authentication data from localStorage
 */
export const clearAuthData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if user has a valid token
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

/**
 * Get the authentication token
 * @returns {string|null} JWT token or null if not found
 */
export const getToken = () => {
  return localStorage.getItem("token");
};
