import React, { useState, useEffect } from "react";
import {
  getAgentAvailability,
  setAgentAvailability,
  deleteAgentAvailability,
  getAllAgents,
} from "../utils/api";
import "./AgentAvailability.css";

export default function AgentAvailability() {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [slots, setSlots] = useState([]);
  const [newSlot, setNewSlot] = useState({ date: "", time: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAgents();
  }, []);

  useEffect(() => {
    if (selectedAgent) fetchSlots(selectedAgent);
  }, [selectedAgent]);

  // Fetch all agents
  const fetchAgents = async () => {
    try {
      const data = await getAllAgents();
      setAgents(Array.isArray(data) ? data : []);
      if (data.length > 0) setSelectedAgent(data[0].id); // default first agent
    } catch (err) {
      console.error("Error fetching agents:", err);
      setMessage("Failed to fetch agents.");
    }
  };

  // Fetch slots for selected agent
  const fetchSlots = async (agentId) => {
    try {
      const data = await getAgentAvailability(agentId);
      setSlots(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching slots:", err);
      setMessage("Failed to fetch availability.");
    }
  };

  const handleAddSlot = async () => {
    if (!newSlot.date || !newSlot.time) {
      setMessage("Please select both date and time.");
      return;
    }
    try {
      await setAgentAvailability(selectedAgent, { ...newSlot, status: "Available" });
      setMessage("Slot added successfully!");
      setNewSlot({ date: "", time: "" });
      fetchSlots(selectedAgent);
    } catch (err) {
      console.error("Error adding slot:", err);
      setMessage("Error adding slot.");
    }
  };

  const handleDeleteSlot = async (slotId) => {
    try {
      await deleteAgentAvailability(selectedAgent, slotId);
      setMessage("Slot deleted successfully!");
      fetchSlots(selectedAgent);
    } catch (err) {
      console.error("Error deleting slot:", err);
      setMessage("Error deleting slot.");
    }
  };

  return (
    <div className="agent-container">
      <h2 className="title">Agent Availability</h2>

      {message && <div className="message">{message}</div>}

      <div className="slot-form">
        <select
          value={selectedAgent}
          onChange={(e) => setSelectedAgent(e.target.value)}
        >
          {agents.map((agent) => (
            <option key={agent.id} value={agent.id}>
              {agent.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={newSlot.date}
          onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
        />
        <input
          type="time"
          value={newSlot.time}
          onChange={(e) => setNewSlot({ ...newSlot, time: e.target.value })}
        />
        <button onClick={handleAddSlot} className="btn-primary">
          Add Slot
        </button>
      </div>

      <div className="slots-list">
        {slots.length === 0 ? (
          <p className="empty-text">No availability slots yet.</p>
        ) : (
          slots.map((s, idx) => (
            <div className="slot-card" key={s.id || idx}>
              <div>
                <span className="slot-date">{s.date}</span> at{" "}
                <span className="slot-time">{s.time}</span>
                <span
                  className={`slot-status ${
                    s.status === "Available" ? "green" : "red"
                  }`}
                >
                  {s.status || "Available"}
                </span>
              </div>
              <button
                className="btn-delete"
                onClick={() => handleDeleteSlot(s.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
