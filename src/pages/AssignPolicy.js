import { useEffect, useState } from "react";
import axios from "axios";

export default function AssignPolicy() {
  const [employees, setEmployees] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [assignData, setAssignData] = useState({ employeeId: "", policyId: "" });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("adminToken");
  const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  useEffect(() => {
    fetchEmployees();
    fetchPolicies();
  }, []);

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employees");
      setEmployees(res.data || []);
    } catch (err) {
      console.error("❌ Failed to fetch employees:", err);
      alert("Failed to fetch employees. Check console for details.");
    }
  };

  // Fetch all insurance policies
  const fetchPolicies = async () => {
    try {
      const res = await api.get("/insurance");
      setPolicies(res.data || []);
    } catch (err) {
      console.error("❌ Failed to fetch policies:", err);
      alert("Failed to fetch policies. Check console for details.");
    }
  };

  // Assign policy to employee
  const handleAssign = async () => {
    if (!assignData.employeeId || !assignData.policyId) {
      alert("Please select employee and policy.");
      return;
    }

    setLoading(true);
    try {
      await api.post(`/employees/${assignData.employeeId}/assignPolicy/${assignData.policyId}`);
      alert("✅ Policy assigned successfully!");
      setAssignData({ employeeId: "", policyId: "" });
      fetchEmployees(); // refresh employee list
    } catch (err) {
      console.error("❌ Failed to assign policy:", err);
      alert(err.response?.data || "Failed to assign policy. Check console for details.");
    }
    setLoading(false);
  };

  // Get policies already assigned to selected employee
  const assignedPolicyIds = employees.find(emp => emp.id === Number(assignData.employeeId))?.policies?.map(p => p.id) || [];

  return (
    <section className="card">
      <div className="card-header" onClick={() => setOpen(!open)}>
        <h2>👥 Assign Policy to Employee</h2>
        <span className={`dropdown-icon ${open ? "open" : ""}`}>▼</span>
      </div>
      <div className={`card-content ${open ? "open" : ""}`}>
        <div className="form-group">
          <select
            value={assignData.employeeId}
            onChange={(e) => setAssignData({ ...assignData, employeeId: e.target.value })}
          >
            <option value="">Select Employee</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>
                {emp.name} ({emp.email})
              </option>
            ))}
          </select>

          <select
            value={assignData.policyId}
            onChange={(e) => setAssignData({ ...assignData, policyId: e.target.value })}
          >
            <option value="">Select Policy</option>
            {policies.map(p => (
              <option key={p.id} value={p.id} disabled={assignedPolicyIds.includes(p.id)}>
                {p.policyName} ({p.policyType}) {assignedPolicyIds.includes(p.id) ? "✅ Assigned" : ""}
              </option>
            ))}
          </select>

          <button className="primary-btn" onClick={handleAssign} disabled={loading}>
            {loading ? "Assigning..." : "Assign Policy"}
          </button>
        </div>

        {assignData.employeeId && (
          <div className="assigned-policies">
            <h4>Assigned Policies:</h4>
            <ul>
              {employees.find(emp => emp.id === Number(assignData.employeeId))?.policies?.map(p => (
                <li key={p.id}>{p.policyName} ({p.policyType})</li>
              )) || <li>None</li>}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
