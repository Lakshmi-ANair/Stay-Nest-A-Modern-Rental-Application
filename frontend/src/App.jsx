import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import './App.css';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import ListingsPage from './pages/ListingsPage';
import ListingDetailPage from './pages/ListingDetailPage';
import CreateListingPage from './pages/CreateListingPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import PreferenceSetupPage from './pages/PreferenceSetupPage';

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <main className="main-content-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={user ? <Navigate to="/dashboard" replace /> : <AuthPage />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/preference-setup" element={<PreferenceSetupPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/listings/new" element={<CreateListingPage />} />
            <Route path="/listings/:listingId" element={<ListingDetailPage />} />
            <Route path="/booking/confirm" element={<BookingConfirmationPage />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}
export default App;