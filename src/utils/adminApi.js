import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE || "";

// ---------------- EMPLOYEE MANAGEMENT ----------------
export const getAllEmployees = async () => {
  const res = await axios.get(`${API_BASE}/api/employees`);
  return res.data;
};

// Assign policy to employee
export const assignPolicyToEmployee = async (employeeId, policyId) => {
  const res = await axios.post(`${API_BASE}/api/employees/${employeeId}/assignPolicy/${policyId}`);
  return res.data;
};
