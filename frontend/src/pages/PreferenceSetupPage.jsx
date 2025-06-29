import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import './PreferenceSetupPage.css';
import preferenceBackgroundImage from '../assets/images/preference-background.jpg';

const COUNTRY_CITY_MAP = { India: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"], USA: ["New York", "Los Angeles", "San Francisco", "Chicago", "Boston"],};
const COUNTRIES = Object.keys(COUNTRY_CITY_MAP);
const OCCUPANT_TYPES = ["Individual / Couple", "Students", "Family", "Any"];
const ACCOMMODATION_TYPES = ["Apartment", "House", "Shared / Co-living", "Any"];
const BEDROOM_OPTIONS = ["Studio / 1 Room", "1 Bedroom", "2 Bedrooms", "3+ Bedrooms", "Any"];
const FURNISHING_OPTIONS = ["Fully Furnished", "Semi-Furnished", "Unfurnished", "Any"];

function PreferenceSetupPage() {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({ country: '', city: '', occupantType: '', accommodationType: '', bedrooms: '', furnishing: '' });
  const [error, setError] = useState('');
  const { user, updateUserPreferencesFlag } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => { if (!user) { navigate('/auth'); } }, [user, navigate]);

  const handleCountryChange = (e) => {
    const { name, value } = e.target;
    setPreferences(prev => ({ ...prev, [name]: value, city: '' }));
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const nextStep = () => {
    if (step === 1 && (!preferences.country || !preferences.city)) { setError("Please select a country and a city to continue."); return; }
    if (step === 2 && !preferences.occupantType) { setError("Please select who this is for."); return; }
    if (step === 3 && !preferences.accommodationType) { setError("Please select the type of accommodation."); return; }
    if (step === 4 && !preferences.bedrooms) { setError("Please select the number of bedrooms."); return; }
    setError('');
    setStep(prev => prev + 1);
  };

  const prevStep = () => { setError(''); setStep(prev => prev - 1); };

  const handleSubmit = async () => {
    if (step === 5 && !preferences.furnishing) { setError("Please select your furnishing preference."); return; }
    setError('');
    try {
      await axios.post('/api/user/preferences', preferences);
      updateUserPreferencesFlag();
      localStorage.setItem('searchPreferences', JSON.stringify(preferences));
      navigate('/listings');
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to save preferences. Please try again.");
      console.error("Preference save error:", err);
    }
  };
  


  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="preference-step">
            <h2>Where are you looking to stay?</h2>
            <p>Select your desired country and city.</p>
            <select name="country" value={preferences.country} onChange={handleCountryChange} className="preference-select" style={{ marginBottom: '15px' }}>
              <option value="">-- Select Country --</option>
              {COUNTRIES.map(country => <option key={country} value={country}>{country}</option>)}
            </select>
            <select name="city" value={preferences.city} onChange={handleChange} className="preference-select" disabled={!preferences.country}>
              <option value="">-- Select City --</option>
              {preferences.country && COUNTRY_CITY_MAP[preferences.country].map(city => (<option key={city} value={city}>{city}</option>))}
            </select>
          </div>
        );
      case 2:
        return (
          <div className="preference-step">
            <h2>Who is this accommodation for?</h2>
            <p>This helps us find suitable options.</p>
            <select name="occupantType" value={preferences.occupantType} onChange={handleChange} className="preference-select">
              <option value="">-- Select Occupant Type --</option>
              {OCCUPANT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
        );
      case 3:
        return (
          <div className="preference-step">
            <h2>What type of place are you looking for?</h2>
            <select name="accommodationType" value={preferences.accommodationType} onChange={handleChange} className="preference-select">
              <option value="">-- Select Accommodation Type --</option>
              {ACCOMMODATION_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
        );
      case 4:
        return (
          <div className="preference-step">
            <h2>How many bedrooms do you need?</h2>
            <p>(BHK: Bedroom, Hall, Kitchen)</p>
            <select name="bedrooms" value={preferences.bedrooms} onChange={handleChange} className="preference-select">
              <option value="">-- Select Bedrooms --</option>
              {BEDROOM_OPTIONS.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
        );
      case 5:
        return (
          <div className="preference-step">
            <h2>What's your furnishing preference?</h2>
            <select name="furnishing" value={preferences.furnishing} onChange={handleChange} className="preference-select">
              <option value="">-- Select Furnishing --</option>
              {FURNISHING_OPTIONS.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
        );
      default:
        return <div>Loading step...</div>;
    }
  };

  const totalSteps = 5;

  return (
    <div className="preference-setup-page" style={{ backgroundImage: `url(${preferenceBackgroundImage})` }}>
      <div className="preference-page-overlay"></div>
      <div className="preference-container">
        <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
        </div>
        <h1 className="preference-title">Let's Find Your Perfect Stay! ({step}/{totalSteps})</h1>
        {error && <p className="message error-message preference-error">{error}</p>}
        {renderStepContent()}
        <div className="navigation-buttons">
          {step > 1 && <button onClick={prevStep} className="nav-button prev-button">Back</button>}
          {step < totalSteps && <button onClick={nextStep} className="nav-button next-button">Next</button>}
          {step === totalSteps && <button onClick={handleSubmit} className="nav-button submit-button">Find My Place!</button>}
        </div>
        <button onClick={() => { localStorage.removeItem('searchPreferences'); navigate('/listings'); }} className="skip-button">
            Skip for now
        </button>
      </div>
    </div>
  );
}

export default PreferenceSetupPage;