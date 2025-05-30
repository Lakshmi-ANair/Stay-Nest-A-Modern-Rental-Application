// frontend/src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ padding: '10px', background: '#eee', marginBottom: '20px' }}>
      <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
      {user ? (
        <>
          <Link to="/dashboard" style={{ marginRight: '10px' }}>Dashboard</Link>
          {/* Add other links like Listings once created */}
          <button onClick={handleLogout}>Logout</button>
          <span style={{ marginLeft: '10px' }}>Logged in as: {user.firstName || user.email}</span>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
}
export default Navbar;