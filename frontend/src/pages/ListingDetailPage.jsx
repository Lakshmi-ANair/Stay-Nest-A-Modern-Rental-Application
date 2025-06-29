import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockListings } from '../data/mockListings.js';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

import BookingWidget from '../components/BookingWidget'; 
import './ListingDetailPage.css';

const AmenityIcon = ({ name }) => {
    const emojiMap = { 'wifi': '📶', 'air conditioning': '❄️', 'kitchen': '🍳', 'parking': '🅿️', 'security': '🛡️', 'gym': '💪', 'washer/dryer': '🧺', 'washing machine': '🧺', 'power backup': '🔋', 'hot water': '💧', 'housekeeping': '🧹', 'terrace': '🌇', 'backyard': '🌳', 'dishwasher': '🍽️', 'heating': '🔥', 'pet friendly': '🐾', 'workspace': '💻', 'patio': '🌿', 'swimming pool': '🏊', 'elevator': '🛗', 'smart tv': '📺', 'community events': '🎉' };
    const emoji = emojiMap[name.toLowerCase()] || '✅';
    return (
        <div className="amenity-box">
            <span className="amenity-emoji">{emoji}</span>
            <span className="amenity-name">{name}</span>
        </div>
    );
};

function ListingDetailPage() {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const { listingId } = useParams();
    const listing = mockListings.find(l => l.id === parseInt(listingId));

    const openLightbox = (index) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    if (!listing) {
        return (
            <div className="listing-not-found">
                <h2>Listing not found!</h2>
                <p>Sorry, we couldn't find the page you're looking for.</p>
                <Link to="/listings">Back to all listings</Link>
            </div>
        );
    }

    const lightboxSlides = listing.images.map(src => ({ src }));

    return (
        <>
            <div className="detail-page-container">
                <div className="detail-header">
                    <h1 className="detail-title">{listing.title}</h1>
                    <p className="detail-location">{listing.city}, {listing.country}</p>
                </div>
                <div className="gallery-container">
                    <div className="gallery-hero" onClick={() => openLightbox(0)}>
                        <img src={listing.images[0]} alt="Main view of the rental" />
                    </div>
                    <div className="gallery-thumbnails">
                        {listing.images.slice(1, 5).map((img, index) => (
                            <div className="thumbnail" key={index} onClick={() => openLightbox(index + 1)}>
                                <img src={img} alt={`View ${index + 2} of the rental`} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="detail-content-wrapper">
                    <div className="detail-main-info">
                        <div className="info-section">
                            <h2>About this rental</h2>
                            <p className="detail-description">{listing.description}</p>
                        </div>
                        <div className="info-section">
                            <h2>What this place offers (Facilities)</h2>
                            <div className="amenities-grid">
                                {listing.amenities.map(amenity => (<AmenityIcon key={amenity} name={amenity} />))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="detail-booking-wrapper">
                        <BookingWidget listing={listing} />
                    </div>
                </div>
            </div>
            <Lightbox
                styles={{ backdrop: { filter: "blur(3px) brightness(0.7)" }, slide: { backgroundColor: "rgba(0, 0, 0, 0)" } }}
                plugins={[Zoom]}
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                slides={lightboxSlides}
                index={lightboxIndex}
            />
        </>
    );
}

export default ListingDetailPage;