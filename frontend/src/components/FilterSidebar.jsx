import React from 'react';
import './FilterSidebar.css';

const COUNTRY_CITY_MAP = {
  India: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"],
  USA: ["New York", "Los Angeles", "San Francisco", "Chicago", "Boston"],
};
const COUNTRIES = Object.keys(COUNTRY_CITY_MAP);
const OCCUPANT_TYPES = ["Individual / Couple", "Students", "Family", "Any"];
const ACCOMMODATION_TYPES = ["Apartment", "House", "Shared / Co-living", "Any"];
const BEDROOM_OPTIONS = ["Studio / 1 Room", "1 Bedroom", "2 Bedrooms", "3+ Bedrooms", "Any"];
const FURNISHING_OPTIONS = ["Fully Furnished", "Semi-Furnished", "Unfurnished", "Any"];

const FilterSidebar = ({ filters, onFilterChange }) => {
  return (
    <div className="filter-sidebar">
      <h3 className="filter-title">Filters</h3>

      {}
      <div className="filter-group">
        <label htmlFor="country">Country</label>
        <select name="country" id="country" value={filters.country || 'Any'} onChange={onFilterChange}>
          <option value="Any">All Countries</option>
          {COUNTRIES.map(country => <option key={country} value={country}>{country}</option>)}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="city">City</label>
        <select
          name="city"
          id="city"
          value={filters.city || 'Any'}
          onChange={onFilterChange}
          disabled={!filters.country || filters.country === 'Any'}
        >
          <option value="Any">All Cities</option>
          {filters.country && COUNTRY_CITY_MAP[filters.country] && COUNTRY_CITY_MAP[filters.country].map(city => (
             <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
      
      {}
      <div className="filter-group">
        <label htmlFor="occupantType">Occupant Type</label>
        <select name="occupantType" id="occupantType" value={filters.occupantType || ''} onChange={onFilterChange}>
          {OCCUPANT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
        </select>
      </div>
      {}
      <div className="filter-group">
        <label htmlFor="accommodationType">Accommodation Type</label>
        <select name="accommodationType" id="accommodationType" value={filters.accommodationType || ''} onChange={onFilterChange}>
          {ACCOMMODATION_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="bedrooms">Bedrooms</label>
        <select name="bedrooms" id="bedrooms" value={filters.bedrooms || ''} onChange={onFilterChange}>
          {BEDROOM_OPTIONS.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="furnishing">Furnishing</label>
        <select name="furnishing" id="furnishing" value={filters.furnishing || ''} onChange={onFilterChange}>
          {FURNISHING_OPTIONS.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
      </div>
    </div>
  );
};

export default FilterSidebar;