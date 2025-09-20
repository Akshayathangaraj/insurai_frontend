import React, { useState, useEffect } from "react";
import { getUserAppointments } from "../utils/api";
import "./AppointmentsList.css";

export default function AppointmentsList({ userId }) {
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAppointments();
    const interval = setInterval(() => {
      fetchAppointments();
    }, 10000); // auto-refresh every 10s
    return () => clearInterval(interval);
  }, [userId]);

  const fetchAppointments = async () => {
    try {
      const res = await getUserAppointments(userId);
      setAppointments(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error("Failed to fetch appointments:", err);
      setAppointments([]);
      showMessage("Failed to load appointments.", "error");
    }
  };

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setTimeout(() => setMessage(""), 4000);
  };

  const now = new Date();

  return (
    <div className="appointments-container">
      <h2 className="title">My Appointments</h2>

      {message && <div className="message">{message}</div>}

      {appointments.length === 0 ? (
        <p className="empty-text">No appointments yet.</p>
      ) : (
        <ul className="appointments-list">
          {appointments.map((a) => {
            const dateTime = new Date(`${a.date}T${a.time}`);
            return (
              <li
                key={a.id}
                className={`appointment ${
                  dateTime < now ? "past" : "upcoming"
                }`}
              >
                {a.date} at {a.time} —{" "}
                {dateTime < now ? "Past" : "Upcoming"}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
