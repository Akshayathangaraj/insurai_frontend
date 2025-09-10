import React, { useState, useEffect } from "react";
import {
  getAgentAvailability,
  setAgentAvailability,
  deleteAgentAvailability,
} from "../utils/api";
import "./AgentAvailability.css";

export default function AgentAvailability() {
  const [slots, setSlots] = useState([]);
  const [newSlot, setNewSlot] = useState({ date: "", time: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const data = await getAgentAvailability();
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
      await setAgentAvailability({ ...newSlot, status: "Available" });
      setMessage("Slot added successfully!");
      setNewSlot({ date: "", time: "" });
      fetchSlots();
    } catch (err) {
      console.error("Error adding slot:", err);
      setMessage("Error adding slot.");
    }
  };

  const handleDeleteSlot = async (id) => {
    try {
      await deleteAgentAvailability(id);
      setMessage("Slot deleted successfully!");
      fetchSlots();
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
            <div className="slot-card" key={idx}>
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
                onClick={() => handleDeleteSlot(s.id || idx)}
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
