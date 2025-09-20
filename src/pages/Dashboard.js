import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

import AgentAvailability from './AgentAvailability';
import AppointmentScheduler from './AppointmentScheduler';
import AppointmentsList from './AppointmentsList';
import Profile from "./Profile";

export default function Dashboard() {
  const [active, setActive] = useState('profile');
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
  const u = JSON.parse(localStorage.getItem('user'));
  if (u) {
    setUser(u);
    console.log("Logged-in user:", u.name, u.id); // <-- debug
  }
  else navigate('/'); // redirect to login if not logged in
}, [navigate]);


  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const renderContent = () => {
  switch (active) {
    case 'profile':
      return <Profile user={user} />;

    case 'settings':
      return <div><h2>Settings</h2><p>Update your account settings here.</p></div>;

    case 'insurances':
      return <div><h2>Insurances Available</h2><p>List of insurances...</p></div>;

    case 'claimed':
      return <div><h2>Claimed</h2><p>Your claimed insurance history.</p></div>;

    case 'apply':
      return <div><h2>Apply for Claim</h2><p>Apply for new claims here.</p></div>;

    case 'availability':
      return <AgentAvailability />;

    case 'schedule':
      return <AppointmentScheduler />;

    case 'appointments':
      return <AppointmentsList />;

    default:
      return <div>Welcome!</div>;
  }
};


  return (
    <div className="dashboard-page">
      <div className="sidebar">
        <h2 className="logo">INSURAI</h2>
        <ul>
          <li className={active === 'profile' ? 'active' : ''} onClick={() => setActive('profile')}>Profile</li>
          <li className={active === 'settings' ? 'active' : ''} onClick={() => setActive('settings')}>Settings</li>
          <li className={active === 'insurances' ? 'active' : ''} onClick={() => setActive('insurances')}>Insurances Available</li>
          <li className={active === 'claimed' ? 'active' : ''} onClick={() => setActive('claimed')}>Claimed</li>
          <li className={active === 'apply' ? 'active' : ''} onClick={() => setActive('apply')}>Apply for Claim</li>
          <li className={active === 'availability' ? 'active' : ''} onClick={() => setActive('availability')}>Agent Availability</li>
          <li className={active === 'schedule' ? 'active' : ''} onClick={() => setActive('schedule')}>Schedule Appointment</li>
          <li className={active === 'appointments' ? 'active' : ''} onClick={() => setActive('appointments')}>Appointments</li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      <div className="content">{renderContent()}</div>
    </div>
  );
}
