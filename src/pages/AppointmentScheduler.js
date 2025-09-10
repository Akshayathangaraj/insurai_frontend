import React, { useState, useEffect } from 'react';
import { getAgentAvailability, scheduleAppointment } from '../utils/api';

export default function AppointmentScheduler() {
  const [slots, setSlots] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    async function fetchSlots() {
      try {
        const data = await getAgentAvailability();
        setSlots(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching slots:", err);
      }
    }
    fetchSlots();
  }, []);

  const handleBook = async () => {
    if (!selected) return;
    const [date, time] = selected.split(' ');
    try {
      await scheduleAppointment({ date, time });
      alert('Appointment booked successfully!');
      setSelected(null);
    } catch (err) {
      console.error("Error booking appointment:", err);
    }
  };

  return (
    <div>
      <h2>Schedule Appointment</h2>
      <select value={selected || ''} onChange={(e) => setSelected(e.target.value)}>
        <option value="">Select a slot</option>
        {slots.map((s, idx) => (
          <option key={idx} value={`${s.date} ${s.time}`}>
            {s.date} at {s.time}
          </option>
        ))}
      </select>
      <button onClick={handleBook}>Book</button>
    </div>
  );
}
