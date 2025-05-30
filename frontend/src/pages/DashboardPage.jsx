// frontend/src/pages/DashboardPage.jsx
import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

function DashboardPage() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>Loading user data or please log in...</p>;
  }

  return (
    <div>
      <h2>User Dashboard</h2>
      <p>Welcome, {user.firstName || user.email}!</p>
      <p>This is your personal dashboard. Upcoming features:</p>
      <ul>
        <li>View upcoming appointments</li>
        <li>Manage bookings</li>
        <li>Saved listings</li>
      </ul>
    </div>
  );
}
export default DashboardPage;