import axios from "axios";

// ✅ Base URL (can be set in .env file as REACT_APP_API_BASE=http://localhost:8080)
const API_BASE = process.env.REACT_APP_API_BASE || "";

// ---------------- AXIOS INSTANCE WITH TOKEN ----------------
const API = axios.create({ baseURL: API_BASE });

// Add JWT token to requests if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken") || localStorage.getItem("token"); // admin or user token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---------------- USER AUTH ----------------
export const signupUser = async (userData) => {
  const res = await API.post("/api/auth/signup", userData);
  return res.data;
};

export const loginUser = async (email, password) => {
  const res = await API.post("/api/auth/login", { email, password });
  return res.data;
};

// ---------------- ADMIN AUTH ----------------
export const signupAdmin = async (adminData) => {
  const res = await API.post("/api/admin/auth/signup", adminData);
  return res.data;
};

export const loginAdmin = async (email, password) => {
  const res = await API.post("/api/admin/auth/login", { email, password });
  return res.data;
};

// ---------------- EMPLOYEE / USER ----------------
export const getProfile = async (userId) => {
  const res = await API.get(`/api/employees/${userId}`);
  return res.data;
};

export const updateProfile = async (userId, updateData) => {
  const res = await API.put(`/api/auth/updateProfile/${userId}`, updateData);
  return res.data;
};

export const uploadProfilePhoto = async (userId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await API.post(
    `/api/auth/${userId}/uploadProfilePhoto`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return res.data;
};

// ---------------- INSURANCE (User Side) ----------------
export const getInsurances = async () => {
  const res = await API.get("/api/insurance");
  return res.data;
};

export const claimInsurance = async (userId, policyId) => {
  const res = await API.post(`/api/employees/${userId}/claims`, { policyId });
  return res.data;
};

// ---------------- AGENT AVAILABILITY ----------------
export const setAgentAvailability = async (agentId, availabilityData) => {
  const res = await API.post(`/api/agents/${agentId}/availability`, availabilityData);
  return res.data;
};

export const getAgentAvailability = async (agentId) => {
  const res = await API.get(`/api/agents/${agentId}/availability`);
  return res.data;
};

export const getAllAgents = async () => {
  const res = await API.get(`/api/agents`);
  return res.data;
};

export const deleteAgentAvailability = async (agentId, slotId) => {
  const res = await API.delete(`/api/agents/${agentId}/availability/${slotId}`);
  return res.data;
};

// ---------------- APPOINTMENTS ----------------
export const scheduleAppointment = async (appointmentData) => {
  const res = await API.post(`/api/appointments`, appointmentData);
  return res.data;
};

export const getUserAppointments = async (userId) => {
  const res = await API.get(`/api/appointments/user/${userId}`);
  return res.data;
};

export const getAgentAppointments = async (agentId) => {
  const res = await API.get(`/api/appointments/agent/${agentId}`);
  return res.data;
};

export const cancelAppointment = async (appointmentId) => {
  const res = await API.delete(`/api/appointments/${appointmentId}`);
  return res.data;
};

// ---------------- ADMIN: INSURANCE POLICIES ----------------
export const getAllPolicies = async () => {
  const res = await API.get("/api/insurance");
  return res.data;
};

export const createPolicy = async (policyData) => {
  const res = await API.post("/api/insurance", policyData);
  return res.data;
};

export const updatePolicy = async (policyId, policyData) => {
  const res = await API.put(`/api/insurance/${policyId}`, policyData);
  return res.data;
};

export const deletePolicy = async (policyId) => {
  const res = await API.delete(`/api/insurance/${policyId}`);
  return res.data;
};

// ---------------- ADMIN: EMPLOYEE MANAGEMENT ----------------
export const getAllEmployees = async () => {
  const res = await API.get("/api/employees");
  return res.data;
};

export const assignPolicyToEmployee = async (employeeId, policyId) => {
  const res = await API.post(`/api/employees/${employeeId}/assignPolicy/${policyId}`);
  return res.data;
};
