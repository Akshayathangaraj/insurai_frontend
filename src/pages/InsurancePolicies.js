import { useEffect, useState } from "react";
import axios from "axios";

export default function InsurancePolicies() {
  const [policies, setPolicies] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [newPolicy, setNewPolicy] = useState({
    policyName: "",
    policyType: "",
    premium: 0,
    coverageAmount: 0,
    provider: "",
    status: "Active",
    startDate: "",
    endDate: "",
    renewalDate: "",
    claimLimit: 0,
    riskLevel: "Low",
    gracePeriod: 0,
    termsAndConditions: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false); // ✅ dropdown state

  const token = localStorage.getItem("adminToken");

  const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    setLoading(true);
    try {
      const res = await api.get("/insurance");
      setPolicies(res.data || []);
    } catch (err) {
      setMessage("❌ Failed to load policies");
    }
    setLoading(false);
  };

  const handlePolicyChange = (e) => {
    setNewPolicy({ ...newPolicy, [e.target.name]: e.target.value });
  };

  const handlePolicySubmit = async () => {
    try {
      if (!newPolicy.policyName || !newPolicy.policyType) {
        alert("Please fill in all policy details.");
        return;
      }

      if (selectedPolicy) {
        await api.put(`/insurance/${selectedPolicy.id}`, newPolicy);
        setMessage("✅ Policy updated successfully");
      } else {
        await api.post("/insurance", newPolicy);
        setMessage("✅ Policy added successfully");
      }

      setSelectedPolicy(null);
      setNewPolicy({
        policyName: "",
        policyType: "",
        premium: 0,
        coverageAmount: 0,
        provider: "",
        status: "Active",
        startDate: "",
        endDate: "",
        renewalDate: "",
        claimLimit: 0,
        riskLevel: "Low",
        gracePeriod: 0,
        termsAndConditions: "",
      });

      fetchPolicies();
    } catch (err) {
      const errorMsg = err.response?.data || "❌ Failed to save policy";
      setMessage(errorMsg);
    }
  };

  const handleDeletePolicy = async (id) => {
    if (!window.confirm("Are you sure you want to delete this policy?")) return;
    try {
      await api.delete(`/insurance/${id}`);
      setMessage("✅ Policy deleted successfully");
      fetchPolicies();
    } catch (err) {
      const errorMsg = err.response?.data || "❌ Failed to delete policy";
      setMessage(errorMsg);
      alert(errorMsg);
    }
  };

  return (
    <section className="card">
      {/* Header with dropdown toggle */}
      <div className="card-header" onClick={() => setIsOpen(!isOpen)}>
        <h2>📑 Insurance Policies</h2>
        <span className={`dropdown-icon ${isOpen ? "open" : ""}`}>▼</span>
      </div>

      <div className={`card-content ${isOpen ? "open" : ""}`}>
        {message && <p className="message">{message}</p>}

        {/* Policy Form (inside dropdown) */}
        <div className="form-grid">
          <div className="form-field">
            <label>Policy Name</label>
            <input name="policyName" value={newPolicy.policyName} onChange={handlePolicyChange} />
          </div>
          <div className="form-field">
            <label>Policy Type</label>
            <input name="policyType" value={newPolicy.policyType} onChange={handlePolicyChange} />
          </div>
          <div className="form-field">
            <label>Premium</label>
            <input name="premium" type="number" value={newPolicy.premium} onChange={handlePolicyChange} />
          </div>
          <div className="form-field">
            <label>Coverage Amount</label>
            <input name="coverageAmount" type="number" value={newPolicy.coverageAmount} onChange={handlePolicyChange} />
          </div>
          <div className="form-field">
            <label>Provider</label>
            <input name="provider" value={newPolicy.provider} onChange={handlePolicyChange} />
          </div>
          <div className="form-field">
            <label>Status</label>
            <select name="status" value={newPolicy.status} onChange={handlePolicyChange}>
              <option>Active</option>
              <option>Expired</option>
              <option>Claimed</option>
            </select>
          </div>
          <div className="form-field">
            <label>Start Date</label>
            <input name="startDate" type="date" value={newPolicy.startDate} onChange={handlePolicyChange} />
          </div>
          <div className="form-field">
            <label>End Date</label>
            <input name="endDate" type="date" value={newPolicy.endDate} onChange={handlePolicyChange} />
          </div>
          <div className="form-field">
            <label>Renewal Date</label>
            <input name="renewalDate" type="date" value={newPolicy.renewalDate} onChange={handlePolicyChange} />
          </div>
          <div className="form-field">
            <label>Claim Limit</label>
            <input name="claimLimit" type="number" value={newPolicy.claimLimit} onChange={handlePolicyChange} />
          </div>
          <div className="form-field">
            <label>Risk Level</label>
            <select name="riskLevel" value={newPolicy.riskLevel} onChange={handlePolicyChange}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div className="form-field">
            <label>Grace Period (days)</label>
            <input name="gracePeriod" type="number" value={newPolicy.gracePeriod} onChange={handlePolicyChange} />
          </div>
          <div className="form-field full-width">
            <label>Terms & Conditions</label>
            <textarea name="termsAndConditions" value={newPolicy.termsAndConditions} onChange={handlePolicyChange}></textarea>
          </div>
          <div className="form-actions">
            <button className="primary-btn" onClick={handlePolicySubmit}>
              {selectedPolicy ? "Update Policy" : "Add Policy"}
            </button>
          </div>
        </div>

        {/* Policies List */}
        {loading ? (
          <p>Loading policies...</p>
        ) : (
          <ul className="list">
            {policies.length === 0 && <li>No policies available</li>}
            {policies.map((p) => (
              <li key={p.id} className="list-item">
                <span>
                  <strong>{p.policyName}</strong> ({p.policyType}) - 💰 {p.premium} | 🛡 {p.coverageAmount}
                  <br />
                  Provider: {p.provider} | Status: {p.status} | Risk: {p.riskLevel}
                </span>
                <div>
                  <button className="secondary-btn" onClick={() => { 
                    setSelectedPolicy(p); 
                    setNewPolicy(p); 
                  }}>Edit</button>
                  <button className="danger-btn" onClick={() => handleDeletePolicy(p.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
