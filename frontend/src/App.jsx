// frontend/src/App.jsx
import React from 'react';
// Make sure BrowserRouter is imported as Router or used directly
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage'; // Your SignupPage component
import DashboardPage from './pages/DashboardPage';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'; // Your global styles

function App() {
  return (
    // 1. BrowserRouter (often aliased as Router) wraps everything
    <Router>
      <Navbar /> {/* Navbar uses Link and useNavigate, so it also needs to be within Router */}
      <div className="container" style={{ padding: '20px' }}>
        {/* 2. Routes component groups all your individual Route definitions */}
        <Routes>
          {/* 3. Each Route maps a path to an element (your page component) */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} /> {/* SignupPage is rendered here */}

          {/* Protected Routes wrapper */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            {/* Add other protected routes here later */}
          </Route>

          {/* Optional: Redirect to home if no route matches */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;