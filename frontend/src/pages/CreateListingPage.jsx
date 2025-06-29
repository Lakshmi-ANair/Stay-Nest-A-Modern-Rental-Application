import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './CreateListingPage.css';

const MySwal = withReactContent(Swal);

const COUNTRIES = ["India", "USA"];
const CITIES_MAP = {
  India: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"],
  USA: ["New York", "Los Angeles", "San Francisco", "Chicago", "Boston"]
};
const OCCUPANT_TYPES = ["Individual / Couple", "Students", "Family", "Any"];
const ACCOMMODATION_TYPES = ["Apartment", "House", "Shared / Co-living"];
const BEDROOM_OPTIONS = ["Studio / 1 Room", "1 Bedroom", "2 Bedrooms", "3+ Bedrooms"];
const FURNISHING_OPTIONS = ["Fully Furnished", "Semi-Furnished", "Unfurnished"];
const ALL_AMENITIES = ["WiFi", "Air Conditioning", "Kitchen", "Parking", "Security", "Gym", "Washing Machine", "Power Backup", "Hot Water", "Housekeeping", "Terrace", "Backyard", "Dishwasher", "Heating", "Pet Friendly", "Workspace"];


function CreateListingPage() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        country: 'India',
        city: 'Mumbai',
        occupantType: 'Any',
        accommodationType: 'Apartment',
        bedrooms: '1 Bedroom',
        furnishing: 'Unfurnished',
        price: '',
        image1: '',
        image2: '',
        image3: '',
        image4: '',
        amenities: [],
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAmenityChange = (e) => {
        const { value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            amenities: checked
                ? [...prev.amenities, value]
                : prev.amenities.filter(a => a !== value)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const listingData = {
            ...formData,
            images: [formData.image1, formData.image2, formData.image3, formData.image4].filter(Boolean)
        };

        try {
            await axios.post('/api/listings', listingData);
            
            await MySwal.fire({
                title: 'Listed!',
                text: 'Your property is now live on StayNest.',
                icon: 'success',
                background: 'var(--bg-container)',
                color: 'var(--text-primary)',
                confirmButtonColor: 'var(--accent-color)',
            });

            navigate('/dashboard');

        } catch (error) {
            console.error("Failed to list property:", error);
            MySwal.fire({
                title: 'Error!',
                text: error.response?.data?.msg || 'Could not list your property. Please check the details and try again.',
                icon: 'error',
                background: 'var(--bg-container)',
                color: 'var(--text-primary)',
                confirmButtonColor: 'var(--accent-color)',
            });
        }
    };

    return (
        <div className="create-listing-container">
            <div className="create-listing-card">
                <form onSubmit={handleSubmit}>
                    <h1>List Your Property</h1>
                    <p>Fill out the details below to put your property on StayNest.</p>

                    <div className="form-section">
                        <label htmlFor="title">Listing Title</label>
                        <input type="text" id="title" name="title" placeholder="e.g., Cozy 2 Bedroom near Downtown" required onChange={handleChange} value={formData.title} />
                    </div>

                    <div className="form-section">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" placeholder="Describe what makes your place special..." required onChange={handleChange} value={formData.description}></textarea>
                    </div>

                    <div className="form-grid">
                        <div className="form-section">
                            <label htmlFor="country">Country</label>
                            <select id="country" name="country" value={formData.country} onChange={handleChange}>
                                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="form-section">
                            <label htmlFor="city">City</label>
                            <select id="city" name="city" value={formData.city} onChange={handleChange}>
                                {CITIES_MAP[formData.country].map(city => <option key={city} value={city}>{city}</option>)}
                            </select>
                        </div>
                    </div>

                     <div className="form-grid">
                        <div className="form-section">
                            <label htmlFor="accommodationType">Accommodation Type</label>
                            <select id="accommodationType" name="accommodationType" value={formData.accommodationType} onChange={handleChange}>{ACCOMMODATION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select>
                        </div>
                        <div className="form-section">
                            <label htmlFor="occupantType">Best Suited For</label>
                            <select id="occupantType" name="occupantType" value={formData.occupantType} onChange={handleChange}>{OCCUPANT_TYPES.map(o => <option key={o} value={o}>{o}</option>)}</select>
                        </div>
                    </div>

                     <div className="form-grid">
                        <div className="form-section">
                            <label htmlFor="bedrooms">Bedrooms</label>
                            <select id="bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleChange}>{BEDROOM_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}</select>
                        </div>
                        <div className="form-section">
                            <label htmlFor="furnishing">Furnishing</label>
                            <select id="furnishing" name="furnishing" value={formData.furnishing} onChange={handleChange}>{FURNISHING_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}</select>
                        </div>
                    </div>
                    
                    <div className="form-section">
                        <label htmlFor="price">Price per Month ({formData.country === 'India' ? '₹' : '$'})</label>
                        <input type="number" id="price" name="price" placeholder="e.g., 35000" required onChange={handleChange} value={formData.price} />
                    </div>

                    <div className="form-section">
                        <label>Amenities</label>
                        <div className="amenities-checkbox-grid">
                            {ALL_AMENITIES.map(amenity => (
                                <div key={amenity} className="checkbox-item">
                                    <input type="checkbox" id={amenity} name="amenities" value={amenity} onChange={handleAmenityChange} checked={formData.amenities.includes(amenity)} />
                                    <label htmlFor={amenity}>{amenity}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-section">
                        <label>Image URLs (at least 1 required)</label>
                        <input type="url" name="image1" placeholder="Main Image URL (Required)" required onChange={handleChange} value={formData.image1}/>
                        <input type="url" name="image2" placeholder="Second Image URL (Optional)" onChange={handleChange} value={formData.image2}/>
                        <input type="url" name="image3" placeholder="Third Image URL (Optional)" onChange={handleChange} value={formData.image3}/>
                        <input type="url" name="image4" placeholder="Fourth Image URL (Optional)" onChange={handleChange} value={formData.image4}/>
                    </div>

                    <button type="submit" className="submit-button">List My Property</button>
                </form>
            </div>
        </div>
    );
}

export default CreateListingPage;