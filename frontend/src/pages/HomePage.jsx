import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './HomePage.css';
import heroBackgroundImage from '../assets/images/hero-background.jpg'; 

function HomePage() {
  const { user } = useContext(AuthContext);

  const heroTitle = "StayNest - Smart Rental Finder";
  const heroSubtext = "Explore top-rated homes, hostels, and rentals near you.";
  const heroCatchySlogan = "Find Comfort, Find Home — Effortlessly.";

  return (
    <div className="homepage-container">
      <div className="hero-section" style={{ backgroundImage: `url(${heroBackgroundImage})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">{heroTitle}</h1>
          <p className="hero-slogan">{heroCatchySlogan}</p>
          <p className="hero-subtext">{heroSubtext}</p>
          {!user ? (
            <Link to="/auth" className="hero-cta-button">Login / Sign Up</Link>
          ) : (
            <Link to={user.has_set_preferences ? "/listings" : "/preference-setup"} className="hero-cta-button">
              Find Your Place
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;