import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8080";

// ---------------- AUTH ----------------

// Signup request
export const signupUser = async (userData) => {
  const res = await axios.post(`${API_BASE}/api/auth/signup`, userData);
  return res.data;
};

// Login request
export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_BASE}/api/auth/login`, { email, password });
  return res.data;
};

// ---------------- EMPLOYEE / USER ----------------

// Get profile details
export const getProfile = async (userId) => {
  const res = await axios.get(`${API_BASE}/api/employees/${userId}`);
  return res.data;
};

// Update profile details
export const updateProfile = async (userId, updateData) => {
  const res = await axios.put(`${API_BASE}/api/employees/${userId}`, updateData);
  return res.data;
};

// ---------------- INSURANCE ----------------

// Fetch all available insurances
export const getInsurances = async () => {
  const res = await axios.get(`${API_BASE}/api/insurance`);
  return res.data;
};

// Claim an insurance
export const claimInsurance = async (userId, policyId) => {
  const res = await axios.post(`${API_BASE}/api/employees/${userId}/claims`, { policyId });
  return res.data;
};

// ---------------- AGENT AVAILABILITY ----------------

// Add or update agent availability
export const setAgentAvailability = async (agentId, availabilityData) => {
  const res = await axios.post(`${API_BASE}/api/agents/${agentId}/availability`, availabilityData);
  return res.data;
};

// Fetch availability for an agent
export const getAgentAvailability = async (agentId) => {
  const res = await axios.get(`${API_BASE}/api/agents/${agentId}/availability`);
  return res.data;
};

// Delete a specific slot
export const deleteAgentAvailability = async (slotId) => {
  const res = await axios.delete(`${API_BASE}/api/agents/availability/${slotId}`);
  return res.data;
};

// ---------------- APPOINTMENTS ----------------

// Schedule an appointment with an agent
export const scheduleAppointment = async (appointmentData) => {
  const res = await axios.post(`${API_BASE}/api/appointments`, appointmentData);
  return res.data;
};

// Fetch appointments for a user
export const getUserAppointments = async (userId) => {
  const res = await axios.get(`${API_BASE}/api/appointments/user/${userId}`);
  return res.data;
};

// Fetch appointments for an agent
export const getAgentAppointments = async (agentId) => {
  const res = await axios.get(`${API_BASE}/api/appointments/agent/${agentId}`);
  return res.data;
};

// Cancel an appointment
export const cancelAppointment = async (appointmentId) => {
  const res = await axios.delete(`${API_BASE}/api/appointments/${appointmentId}`);
  return res.data;
};
