import React, { useState, useEffect } from "react";
import { getAgentAvailability, scheduleAppointment, getAllAgents } from "../utils/api";
import "./AppointmentScheduler.css";

export default function AppointmentScheduler() {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success"); // success | error

  useEffect(() => {
    fetchAgents();
    const interval = setInterval(() => {
      if (selectedAgent) fetchSlots(selectedAgent);
    }, 10000); // auto-refresh every 10s
    return () => clearInterval(interval);
  }, [selectedAgent]);

  const fetchAgents = async () => {
    try {
      const data = await getAllAgents();
      setAgents(Array.isArray(data) ? data : []);
      if (data.length > 0) setSelectedAgent(data[0].id);
    } catch (err) {
      console.error("Error fetching agents:", err);
      showMessage("Failed to fetch agents.", "error");
    }
  };

  const fetchSlots = async (agentId) => {
    try {
      const data = await getAgentAvailability(agentId);
      setSlots(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching slots:", err);
      showMessage("Failed to fetch availability.", "error");
    }
  };

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(""), 4000); // hide after 4s
  };

  const handleBook = async () => {
    if (!selectedSlot) {
      showMessage("Please select a slot.", "error");
      return;
    }

    const [date, time] = selectedSlot.split(" ");
    try {
      await scheduleAppointment({ agentId: selectedAgent, date, time });
      showMessage("Appointment booked successfully!", "success");
      setSelectedSlot("");
      fetchSlots(selectedAgent); // auto-refresh slots
    } catch (err) {
      console.error("Error booking appointment:", err);
      showMessage("Failed to book appointment.", "error");
    }
  };

  return (
    <div className="appointment-container">
      <h2 className="title">Schedule Appointment</h2>

      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}

      <div className="form-section">
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

        <select
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
        >
          <option value="">Select a slot</option>
          {slots.map((s) => (
            <option
              key={s.id}
              value={`${s.date} ${s.time}`}
              disabled={s.status !== "Available"}
            >
              {s.date} at {s.time} — {s.status}
            </option>
          ))}
        </select>

        <button className="btn-primary" onClick={handleBook}>
          Book Appointment
        </button>
      </div>

      <div className="slots-grid">
        {slots.length === 0 ? (
          <p className="empty-text">No slots available for this agent.</p>
        ) : (
          slots.map((s) => (
            <div
              key={s.id}
              className={`slot-card ${
                s.status === "Available" ? "available" : "booked"
              }`}
            >
              {s.date} at {s.time} — {s.status}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
