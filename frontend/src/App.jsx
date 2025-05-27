// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import './App.css';

function App() {
  const [messageFromApi, setMessageFromApi] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // The URL of your Flask API endpoint
    const apiUrl = 'http://localhost:5001/api/message';

    axios.get(apiUrl)
      .then(response => {
        setMessageFromApi(response.data.message);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching data!", error);
        setError("Failed to load message from API. Is the backend running?");
        setLoading(false);
      });
  }, []); // The empty array [] means this effect runs once after the initial render

  return (
    <div>
      <h1>Welcome to Our Rental Finder!</h1>
      <p>This is the future user page where you can find apartments.</p>
      <hr />
      <h2>Message from Backend:</h2>
      {loading && <p>Loading message...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && messageFromApi && <p>{messageFromApi}</p>}
      {!loading && !error && !messageFromApi && <p>No message received.</p>}
    </div>
  );
}

export default App;