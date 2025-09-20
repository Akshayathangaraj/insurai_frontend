import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InsurancePolicies from "./InsurancePolicies";
import AssignPolicy from "./AssignPolicy";
import EmployeeOverview from "./EmployeeOverview";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) navigate("/admin/login");
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
      </header>

      <div className="dashboard-content">
        <InsurancePolicies />
        <AssignPolicy />
        <EmployeeOverview />
      </div>
    </div>
  );
}
