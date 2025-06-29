import React, { useEffect, useState } from 'react';
import { mockListings } from '../data/mockListings.js'; 
import ListingCard from '../components/ListingCard.jsx';
import FilterSidebar from '../components/FilterSidebar.jsx';
import './ListingsPage.css';

const defaultFilters = { country: 'Any', city: 'Any', occupantType: 'Any', accommodationType: 'Any', bedrooms: 'Any', furnishing: 'Any' };

function ListingsPage() {
    const [activeFilters, setActiveFilters] = useState(defaultFilters);
    const [filteredListings, setFilteredListings] = useState([]);

    useEffect(() => {
        const savedPrefs = localStorage.getItem('searchPreferences');
        setActiveFilters(savedPrefs ? JSON.parse(savedPrefs) : defaultFilters);
    }, []);

    useEffect(() => {
        const results = mockListings.filter(listing => {
            return (
                (activeFilters.country === 'Any' || listing.country === activeFilters.country) &&
                (activeFilters.city === 'Any' || listing.city === activeFilters.city) &&
                (activeFilters.occupantType === 'Any' || listing.occupantType === activeFilters.occupantType) &&
                (activeFilters.accommodationType === 'Any' || listing.accommodationType === activeFilters.accommodationType) &&
                (activeFilters.bedrooms === 'Any' || listing.bedrooms === activeFilters.bedrooms) &&
                (activeFilters.furnishing === 'Any' || listing.furnishing === activeFilters.furnishing)
            );
        });
        setFilteredListings(results);
    }, [activeFilters]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setActiveFilters(prevFilters => {
            const newFilters = { ...prevFilters, [name]: value };
            if (name === 'country') newFilters.city = 'Any';
            localStorage.setItem('searchPreferences', JSON.stringify(newFilters));
            return newFilters;
        });
    };

    return (
        <div className="listings-page-background">
            <div className="listings-page-container">
                <FilterSidebar filters={activeFilters} onFilterChange={handleFilterChange} />
                <div className="listings-content-area">
                    <div className="listings-header"><h1>Available Listings</h1></div>
                    {filteredListings.length > 0 ? (
                        <div className="listings-grid">
                            {filteredListings.map(listing => <ListingCard key={listing.id} listing={listing} />)}
                        </div>
                    ) : (
                        <div className="no-results">
                            <h2>No Properties Found</h2>
                            <p>We couldn't find any listings that match your criteria. Try adjusting the filters!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListingsPage;