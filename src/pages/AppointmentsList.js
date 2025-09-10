import React, { useState, useEffect } from 'react';
import { getUserAppointments } from '../utils/api';

export default function AppointmentsList() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await getUserAppointments(1); // 🔹 pass a real userId here
        setAppointments(Array.isArray(res) ? res : []); // ✅ ensure always array
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
        setAppointments([]); // fallback to empty
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <h2>Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <ul>
          {appointments.map((a, idx) => (
            <li key={idx}>
              {a.date} at {a.time} — Booked
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
