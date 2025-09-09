import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8080";

// Signup request (use when backend is ready)
export const signupUser = async (userData) => {
  const res = await axios.post(`${API_BASE}/api/auth/signup`, userData);
  return res.data;
};

// Login request (for later)
export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_BASE}/api/auth/login`, { email, password });
  return res.data;
};
