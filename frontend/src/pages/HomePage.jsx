// frontend/src/pages/HomePage.jsx
import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

function HomePage() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome to the Rental Finder!</h1>
      {user ? (
        <p>Hello, {user.firstName || user.email}! You are logged in.</p>
      ) : (
        <p>Please log in or sign up to find your next stay.</p>
      )}
      <p>This is where listings will eventually appear.</p>
    </div>
  );
}
export default HomePage;