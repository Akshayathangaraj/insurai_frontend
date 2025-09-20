import { useEffect, useState } from "react";
import axios from "axios";

export default function EmployeeOverview() {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("adminToken");
  const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employees");
      setEmployees(res.data || []);
    } catch (err) {
      console.error("❌ Failed to fetch employees:", err);
    }
  };

  return (
    <section className="card">
      <div className="card-header" onClick={() => setOpen(!open)}>
        <h2>🧑‍💼 Employee Overview</h2>
        <span className={`dropdown-icon ${open ? "open" : ""}`}>▼</span>
      </div>
      <div className={`card-content ${open ? "open" : ""}`}>
        <ul className="list">
          {employees.length === 0 && <li>No employees found</li>}
          {employees.map((emp) => (
            <li key={emp.id} className="list-item">
              <strong>{emp.name}</strong> ({emp.email})  
              <br /> Policies: {emp.policies?.map((p) => p.policyName).join(", ") || "None"}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
